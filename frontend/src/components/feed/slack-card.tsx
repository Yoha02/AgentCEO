'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Clock, Lightbulb, MessageCircle } from 'lucide-react';
import type { SlackItem } from '@/types';

interface SlackCardProps {
  item: SlackItem;
  onOpenThread: () => void;
  onQuickReply: () => void;
  onDone: () => void;
}

export function SlackCard({ item, onOpenThread, onQuickReply, onDone }: SlackCardProps) {
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
            <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center">
              <MessageSquare className="h-3.5 w-3.5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Slack {item.channel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={urgencyColors[item.urgency]}>
              {item.urgency.toUpperCase()}
            </Badge>
            <span className="text-xs text-slate-500">{timeAgo}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatar} />
            <AvatarFallback>{item.from.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-slate-900">{item.from}</p>
            <p className="text-sm text-slate-700">&quot;{item.content}&quot;</p>
          </div>
        </div>

        {/* Why it matters */}
        <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 rounded-lg">
          <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">Why: {item.whyItMatters}</p>
        </div>

        {/* Thread count & reactions */}
        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {item.threadCount} replies
          </span>
          <span className="flex items-center gap-1">
            {item.reactions.map((r, i) => (
              <span key={i}>{r}</span>
            ))}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button onClick={onOpenThread} className="bg-purple-600 hover:bg-purple-700">
            Open Thread
          </Button>
          <Button onClick={onQuickReply} variant="outline">
            Quick Reply
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
  
  if (diff < 60) return `${diff}m`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h`;
  return `${Math.floor(diff / 1440)}d`;
}
