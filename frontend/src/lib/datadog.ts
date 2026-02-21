// Datadog HTTP API integration (no agent required)
// Sends logs and metrics directly to Datadog's intake APIs

const DD_API_KEY = process.env.DD_API_KEY || '';
const DD_SITE = process.env.DD_SITE || 'datadoghq.com';
const USE_MOCK = process.env.USE_MOCK_DATADOG === 'true';

// Direct HTTP endpoints
const LOGS_ENDPOINT = `https://http-intake.logs.${DD_SITE}/api/v2/logs`;
const METRICS_ENDPOINT = `https://api.${DD_SITE}/api/v2/series`;

// Service metadata
const SERVICE = process.env.DD_SERVICE || 'agentceo';
const ENV = process.env.DD_ENV || 'development';

// In-memory metrics store for mock mode
const mockMetrics: { name: string; value: number; timestamp: number; tags: string[] }[] = [];
const mockLogs: { level: string; message: string; timestamp: string; attributes: Record<string, unknown> }[] = [];

// Get mock data for UI display
export function getMockMetrics() {
  return mockMetrics.slice(-100); // Last 100 metrics
}

export function getMockLogs() {
  return mockLogs.slice(-50); // Last 50 logs
}

// Initialize Datadog (logs that we're ready)
export function initDatadog() {
  if (USE_MOCK) {
    console.log(`Datadog initialized (MOCK MODE): service=${SERVICE}, env=${ENV}`);
    // Store startup log
    mockLogs.push({
      level: 'info',
      message: 'AgentCEO application started',
      timestamp: new Date().toISOString(),
      attributes: { event: 'startup' },
    });
  } else if (DD_API_KEY) {
    console.log(`Datadog initialized: service=${SERVICE}, env=${ENV}, site=${DD_SITE}`);
    sendLog('info', 'AgentCEO application started', { event: 'startup' });
  } else {
    console.warn('Datadog API key not set - telemetry disabled');
  }
}

// Send a log entry to Datadog via HTTP API
export async function sendLog(
  level: 'info' | 'warn' | 'error' | 'debug',
  message: string,
  attributes?: Record<string, unknown>
) {
  // Store in mock metrics regardless
  mockLogs.push({
    level,
    message,
    timestamp: new Date().toISOString(),
    attributes: attributes || {},
  });

  // In mock mode, just store locally
  if (USE_MOCK || !DD_API_KEY) return;

  const logEntry = {
    ddsource: 'nodejs',
    ddtags: `env:${ENV},service:${SERVICE}`,
    hostname: 'agentceo-app',
    message: JSON.stringify({
      message,
      level,
      timestamp: new Date().toISOString(),
      ...attributes,
    }),
    service: SERVICE,
  };

  try {
    const response = await fetch(LOGS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DD-API-KEY': DD_API_KEY,
      },
      body: JSON.stringify([logEntry]),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Datadog log failed (${response.status}):`, text);
    }
  } catch (error) {
    console.error('Failed to send log to Datadog:', error);
  }
}

// Send a metric to Datadog via HTTP API
export async function sendMetric(
  name: string,
  value: number,
  type: 'gauge' | 'count' = 'gauge',
  tags?: string[]
) {
  const now = Math.floor(Date.now() / 1000);
  const metricTags = [`env:${ENV}`, `service:${SERVICE}`, ...(tags || [])];

  // Store in mock metrics regardless
  mockMetrics.push({
    name: `agentceo.${name}`,
    value,
    timestamp: now,
    tags: metricTags,
  });

  // In mock mode, just store locally
  if (USE_MOCK || !DD_API_KEY) return;

  const payload = {
    series: [
      {
        metric: `agentceo.${name}`,
        type: type === 'gauge' ? 1 : 3,
        points: [
          {
            timestamp: now,
            value: value,
          },
        ],
        tags: metricTags,
      },
    ],
  };

  try {
    const response = await fetch(METRICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DD-API-KEY': DD_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Datadog metric failed (${response.status}):`, text);
    }
  } catch (error) {
    console.error('Failed to send metric to Datadog:', error);
  }
}

// Track LLM call with logging
export async function traceLLMCall<T>(
  operation: string,
  modelId: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();
  
  await sendLog('info', `LLM call started: ${operation}`, {
    operation,
    model: modelId,
    type: 'llm_request_start',
  });

  try {
    const result = await fn();
    const duration = Date.now() - startTime;

    await sendLog('info', `LLM call completed: ${operation}`, {
      operation,
      model: modelId,
      duration_ms: duration,
      type: 'llm_request_complete',
      status: 'success',
    });

    await sendMetric('llm.request.duration', duration, 'gauge', [`operation:${operation}`, `model:${modelId}`]);
    await sendMetric('llm.request.count', 1, 'count', [`operation:${operation}`, `status:success`]);

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    await sendLog('error', `LLM call failed: ${operation}`, {
      operation,
      model: modelId,
      duration_ms: duration,
      type: 'llm_request_error',
      error: error instanceof Error ? error.message : String(error),
    });

    await sendMetric('llm.request.count', 1, 'count', [`operation:${operation}`, `status:error`]);

    throw error;
  }
}

// Track API request
export async function trackAPIRequest(
  endpoint: string,
  method: string,
  statusCode: number,
  durationMs: number
) {
  await sendLog('info', `API request: ${method} ${endpoint}`, {
    endpoint,
    method,
    status_code: statusCode,
    duration_ms: durationMs,
    type: 'api_request',
  });

  await sendMetric('api.request.duration', durationMs, 'gauge', [`endpoint:${endpoint}`, `method:${method}`]);
  await sendMetric('api.request.count', 1, 'count', [`endpoint:${endpoint}`, `status:${statusCode}`]);
}

// Convenience logging functions
export function logWithTrace(level: 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>) {
  // Log locally
  const logData = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: SERVICE,
    env: ENV,
    ...data,
  };

  if (level === 'error') {
    console.error(JSON.stringify(logData));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logData));
  } else {
    console.log(JSON.stringify(logData));
  }

  // Also send to Datadog
  sendLog(level, message, data);
}
