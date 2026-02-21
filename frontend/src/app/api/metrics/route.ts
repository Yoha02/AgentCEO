import { NextResponse } from 'next/server';
import { getMockMetrics, getMockLogs } from '@/lib/datadog';

// GET /api/metrics - Get collected metrics and logs
export async function GET() {
  const metrics = getMockMetrics();
  const logs = getMockLogs();

  // Calculate some aggregated stats
  const llmRequests = metrics.filter(m => m.name.includes('llm.request'));
  const apiRequests = metrics.filter(m => m.name.includes('api.request'));

  const avgLLMDuration = llmRequests
    .filter(m => m.name.includes('duration'))
    .reduce((sum, m) => sum + m.value, 0) / Math.max(llmRequests.filter(m => m.name.includes('duration')).length, 1);

  const avgAPIDuration = apiRequests
    .filter(m => m.name.includes('duration'))
    .reduce((sum, m) => sum + m.value, 0) / Math.max(apiRequests.filter(m => m.name.includes('duration')).length, 1);

  const totalLLMCalls = llmRequests.filter(m => m.name.includes('count')).length;
  const totalAPICalls = apiRequests.filter(m => m.name.includes('count')).length;

  const errorLogs = logs.filter(l => l.level === 'error');

  return NextResponse.json({
    summary: {
      llm: {
        totalCalls: totalLLMCalls || 5, // Default demo values
        avgDurationMs: Math.round(avgLLMDuration) || 847,
        successRate: 98.5,
      },
      api: {
        totalCalls: totalAPICalls || 23,
        avgDurationMs: Math.round(avgAPIDuration) || 124,
        errorRate: errorLogs.length > 0 ? (errorLogs.length / logs.length) * 100 : 0.2,
      },
      system: {
        uptime: '2h 34m',
        memoryUsage: 67,
        cpuUsage: 12,
      },
    },
    recentMetrics: metrics.slice(-20),
    recentLogs: logs.slice(-10),
    traces: [
      {
        id: 'trace-001',
        operation: 'POST /api/chat',
        duration: 1243,
        status: 'success',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        spans: [
          { name: 'http.request', duration: 1243 },
          { name: 'llm.triage', duration: 847 },
          { name: 'mock-bedrock.chat', duration: 634 },
        ],
      },
      {
        id: 'trace-002',
        operation: 'GET /api/gmail/emails',
        duration: 2156,
        status: 'success',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        spans: [
          { name: 'http.request', duration: 2156 },
          { name: 'gmail.fetch', duration: 1823 },
          { name: 'llm.triage', duration: 956 },
        ],
      },
      {
        id: 'trace-003',
        operation: 'POST /api/gmail/draft',
        duration: 1567,
        status: 'success',
        timestamp: new Date(Date.now() - 180000).toISOString(),
        spans: [
          { name: 'http.request', duration: 1567 },
          { name: 'llm.generate_draft', duration: 1234 },
        ],
      },
    ],
  });
}
