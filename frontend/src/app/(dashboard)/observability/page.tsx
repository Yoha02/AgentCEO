'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Zap,
  Database,
  Brain,
} from 'lucide-react';

const recentTraces = [
  { id: 'trace_001', action: 'Draft Generated', duration: '1.2s', status: 'success', time: '2 min ago' },
  { id: 'trace_002', action: 'Email Sync', duration: '3.4s', status: 'success', time: '5 min ago' },
  { id: 'trace_003', action: 'Triage Analysis', duration: '0.8s', status: 'success', time: '5 min ago' },
  { id: 'trace_004', action: 'Draft Generated', duration: '1.5s', status: 'success', time: '12 min ago' },
  { id: 'trace_005', action: 'Email Send', duration: '0.5s', status: 'success', time: '15 min ago' },
];

const metrics = [
  { name: 'API Latency (p50)', value: '120ms', trend: '↓ 5%', good: true },
  { name: 'API Latency (p95)', value: '450ms', trend: '↓ 12%', good: true },
  { name: 'Error Rate', value: '0.5%', trend: '↓ 0.2%', good: true },
  { name: 'Bedrock Latency', value: '1.1s', trend: '↑ 0.1s', good: false },
];

export default function ObservabilityPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Observability" />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Status Banner */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">All Systems Operational</p>
                <p className="text-sm text-green-600">Last checked: 30 seconds ago</p>
              </div>
            </div>
            <Button variant="outline" className="border-green-300 text-green-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Datadog
            </Button>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.name}>
              <CardContent className="p-4">
                <p className="text-sm text-slate-500">{metric.name}</p>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                <Badge 
                  variant="secondary" 
                  className={metric.good ? 'text-green-700 bg-green-100' : 'text-orange-700 bg-orange-100'}
                >
                  {metric.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sync Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-5 w-5 text-blue-600" />
                Sync Pipeline Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-800 rounded-lg mb-4 flex items-end px-2 pb-2">
                {[60, 75, 65, 80, 70, 85, 75, 90, 80, 85, 75, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-0.5 bg-blue-500 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Items Synced</p>
                  <p className="font-semibold">1,247</p>
                </div>
                <div>
                  <p className="text-slate-500">Sync Duration</p>
                  <p className="font-semibold">3.2s avg</p>
                </div>
                <div>
                  <p className="text-slate-500">Failures</p>
                  <p className="font-semibold text-green-600">0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-5 w-5 text-purple-600" />
                Bedrock AI Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-800 rounded-lg mb-4 flex items-end px-2 pb-2">
                {[40, 55, 45, 60, 50, 65, 55, 70, 60, 65, 55, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-0.5 bg-purple-500 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Requests</p>
                  <p className="font-semibold">342</p>
                </div>
                <div>
                  <p className="text-slate-500">Avg Latency</p>
                  <p className="font-semibold">1.1s</p>
                </div>
                <div>
                  <p className="text-slate-500">Success Rate</p>
                  <p className="font-semibold text-green-600">99.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Traces */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-5 w-5 text-amber-600" />
              Recent Traces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentTraces.map((trace) => (
                <div
                  key={trace.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {trace.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium text-slate-900">{trace.action}</p>
                      <p className="text-sm text-slate-500">{trace.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-600">{trace.duration}</span>
                    <span className="text-slate-400">{trace.time}</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
