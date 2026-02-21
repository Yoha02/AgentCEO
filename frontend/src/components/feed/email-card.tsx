'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Clock, Lightbulb } from 'lucide-react';
import type { EmailItem } from '@/types';

interface EmailCardProps {
  item: EmailItem;
  onDraftReply: () => void;
  onSnooze: () => void;
  onDone: () => void;
}

export function EmailCard({ item, onDraftReply, onSnooze, onDone }: EmailCardProps) {
  const urgencyColors = {
    urgent: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    normal: 'bg-slate-100 text-slate-700 border-slate-200',
    low: 'bg-slate-50 text-slate-500 border-slate-100',
  };

  const timeAgo = getTimeAgo(item.timestamp);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-red-100 flex items-center justify-center">
              <Mail className="h-3.5 w-3.5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Gmail</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={urgencyColors[item.urgency]}>
              {item.urgency.toUpperCase()}
            </Badge>
            <span className="text-xs text-slate-500">{timeAgo}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">{item.subject}</h3>
          <p className="text-sm text-slate-600">From: {item.fromName}</p>
          <p className="text-sm text-slate-500 line-clamp-2">&quot;{item.snippet}&quot;</p>
        </div>

        {/* Why it matters */}
        <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 rounded-lg">
          <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">Why: {item.whyItMatters}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button onClick={onDraftReply} className="bg-blue-600 hover:bg-blue-700">
            Draft Reply
          </Button>
          <Button onClick={onSnooze} variant="outline">
            <Clock className="h-4 w-4 mr-1" />
            Snooze
          </Button>
          <Button onClick={onDone} variant="outline">
            Mark Done
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000 / 60);
  
  if (diff < 60) return `${diff} mins ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
  return `${Math.floor(diff / 1440)} days ago`;
}
