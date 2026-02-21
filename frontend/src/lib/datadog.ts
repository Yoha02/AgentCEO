// Datadog initialization for APM and LLM Observability
// This file should be imported at the very top of your application entry point

import tracer from 'dd-trace';

// Initialize Datadog tracer
export function initDatadog() {
  if (process.env.DD_API_KEY) {
    tracer.init({
      service: process.env.DD_SERVICE || 'agentceo',
      env: process.env.DD_ENV || 'development',
      version: '1.0.0',
      logInjection: true,
      runtimeMetrics: true,
      profiling: true,
    });

    // Enable LLM Observability if configured
    if (process.env.DD_LLMOBS_ENABLED === 'true') {
      tracer.use('fetch');
      tracer.use('http');
    }

    console.log('Datadog tracer initialized');
  }
}

// LLM Observability wrapper for Bedrock calls
export function traceLLMCall<T>(
  operation: string,
  modelId: string,
  fn: () => Promise<T>
): Promise<T> {
  const span = tracer.startSpan('llm.request', {
    tags: {
      'llm.request.model': modelId,
      'llm.request.type': operation,
      'service.name': 'agentceo',
    },
  });

  return fn()
    .then((result) => {
      span.setTag('llm.response.status', 'success');
      span.finish();
      return result;
    })
    .catch((error) => {
      span.setTag('error', true);
      span.setTag('error.message', error.message);
      span.finish();
      throw error;
    });
}

// Custom metrics for dashboard
export function recordMetric(name: string, value: number, tags?: Record<string, string>) {
  const span = tracer.scope().active();
  if (span) {
    span.setTag(`agentceo.${name}`, value);
    if (tags) {
      Object.entries(tags).forEach(([key, val]) => {
        span.setTag(`agentceo.${name}.${key}`, val);
      });
    }
  }
}

// Log with trace context
export function logWithTrace(level: 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>) {
  const span = tracer.scope().active();
  const traceId = span?.context().toTraceId();
  const spanId = span?.context().toSpanId();

  const logData = {
    timestamp: new Date().toISOString(),
    level,
    message,
    dd: {
      trace_id: traceId,
      span_id: spanId,
      service: process.env.DD_SERVICE || 'agentceo',
      env: process.env.DD_ENV || 'development',
    },
    ...data,
  };

  if (level === 'error') {
    console.error(JSON.stringify(logData));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logData));
  } else {
    console.log(JSON.stringify(logData));
  }
}

export default tracer;
