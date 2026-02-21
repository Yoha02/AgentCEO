'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, Users, Video, FileText, Check } from 'lucide-react';
import type { CalendarItem } from '@/types';

interface CalendarCardProps {
  item: CalendarItem;
  onPrepNotes: () => void;
  onJoinMeeting: () => void;
  onDone: () => void;
}

export function CalendarCard({ item, onPrepNotes, onJoinMeeting, onDone }: CalendarCardProps) {
  const timeUntil = getTimeUntil(item.startTime);
  const isUpcoming = timeUntil.includes('min') || timeUntil.includes('hr');

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${isUpcoming ? 'border-l-4 border-l-blue-500' : ''}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Calendar</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <Clock className="h-3 w-3 mr-1" />
              {timeUntil}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-600">
            {formatTime(item.startTime)} - {formatTime(item.endTime)} • {item.location}
          </p>
        </div>

        {/* Attendees */}
        <div className="flex items-center gap-2 mt-3">
          <Users className="h-4 w-4 text-slate-500" />
          <div className="flex -space-x-2">
            {item.attendees.slice(0, 3).map((attendee, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-white">
                <AvatarFallback className="text-xs bg-slate-200">
                  {attendee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {item.attendees.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs text-slate-600">
                +{item.attendees.length - 3}
              </div>
            )}
          </div>
          <span className="text-sm text-slate-500">
            {item.attendees.map(a => a.name).slice(0, 2).join(', ')}
            {item.attendees.length > 2 ? `, +${item.attendees.length - 2} others` : ''}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button onClick={onPrepNotes} className="bg-blue-600 hover:bg-blue-700">
            <FileText className="h-4 w-4 mr-1" />
            Prep Notes
          </Button>
          {item.meetingLink && (
            <Button onClick={onJoinMeeting} variant="outline">
              <Video className="h-4 w-4 mr-1" />
              Join Meeting
            </Button>
          )}
          <Button onClick={onDone} variant="outline">
            <Check className="h-4 w-4 mr-1" />
            Done
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeUntil(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((then.getTime() - now.getTime()) / 1000 / 60);
  
  if (diff < 0) return 'Past';
  if (diff < 60) return `In ${diff} min`;
  if (diff < 1440) return `In ${Math.floor(diff / 60)} hr`;
  return `In ${Math.floor(diff / 1440)} days`;
}
