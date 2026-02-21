'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  RefreshCw,
  FileText,
  CheckCircle,
  Clock,
} from 'lucide-react';

const auditLogs = [
  {
    id: 'log_001',
    action: 'Email Sent',
    icon: Send,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    details: 'Reply sent to sarah.chen@techcorp.com',
    timestamp: '2026-02-20T14:50:00Z',
    traceId: 'trace_abc123',
  },
  {
    id: 'log_002',
    action: 'Draft Created',
    icon: FileText,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    details: 'Draft generated for "Re: Q1 Contract Review"',
    timestamp: '2026-02-20T14:45:00Z',
    traceId: 'trace_def456',
  },
  {
    id: 'log_003',
    action: 'Sync Completed',
    icon: RefreshCw,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    details: 'Gmail sync: 12 new items',
    timestamp: '2026-02-20T14:40:00Z',
    traceId: 'trace_ghi789',
  },
  {
    id: 'log_004',
    action: 'Draft Approved',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    details: 'User approved draft for partnership proposal',
    timestamp: '2026-02-20T13:30:00Z',
    traceId: 'trace_jkl012',
  },
  {
    id: 'log_005',
    action: 'Sync Completed',
    icon: RefreshCw,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    details: 'Gmail sync: 5 new items',
    timestamp: '2026-02-20T13:00:00Z',
    traceId: 'trace_mno345',
  },
];

export default function AuditPage() {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Audit Log" />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <p className="text-slate-600">
          Complete history of all actions taken by AgentCEO on your behalf.
        </p>

        {/* Timeline */}
        <div className="space-y-4">
          {auditLogs.map((log, index) => (
            <Card key={log.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-lg ${log.iconBg} flex items-center justify-center`}>
                    <log.icon className={`h-5 w-5 ${log.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">{log.action}</p>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(log.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{log.details}</p>
                    <Badge variant="outline" className="mt-2 text-xs font-mono">
                      {log.traceId}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
