'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Video,
  Mail,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

import calendarData from '@/data/mock/calendar.json';

const todaysPlan = [
  {
    id: '1',
    time: '9:00 AM',
    title: 'Review urgent emails',
    type: 'task',
    status: 'done',
    description: 'Contract sign-off for Sarah',
  },
  {
    id: '2',
    time: '10:00 AM',
    title: 'Team Standup',
    type: 'meeting',
    status: 'upcoming',
    description: 'Zoom • 30 min',
    meetingLink: 'https://zoom.us',
  },
  {
    id: '3',
    time: '10:30 AM',
    title: 'Focus Block',
    type: 'focus',
    status: 'pending',
    description: 'Deep work time - PR reviews',
  },
  {
    id: '4',
    time: '2:00 PM',
    title: '1:1 with Manager',
    type: 'meeting',
    status: 'pending',
    description: 'Google Meet • 30 min',
    meetingLink: 'https://meet.google.com',
  },
  {
    id: '5',
    time: '3:00 PM',
    title: 'Respond to partnership proposal',
    type: 'task',
    status: 'pending',
    description: 'Mike Johnson follow-up',
  },
];

export default function PlanPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'upcoming':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-slate-300" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Video className="h-4 w-4 text-blue-600" />;
      case 'task':
        return <Mail className="h-4 w-4 text-amber-600" />;
      case 'focus':
        return <Sparkles className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Today&apos;s Plan</h1>
          <p className="text-sm text-slate-500">Friday, Feb 21</p>
        </div>
        <Badge className="bg-green-100 text-green-700">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Generated
        </Badge>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardContent className="p-4">
          <h2 className="font-semibold text-slate-900 mb-2">Daily Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">2</p>
              <p className="text-xs text-slate-500">Meetings</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">3</p>
              <p className="text-xs text-slate-500">Tasks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">4h</p>
              <p className="text-xs text-slate-500">Focus Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-1">
        {todaysPlan.map((item, index) => (
          <div key={item.id} className="flex gap-3">
            {/* Time Column */}
            <div className="w-16 text-right">
              <span className="text-xs font-medium text-slate-500">{item.time}</span>
            </div>

            {/* Status Line */}
            <div className="flex flex-col items-center">
              {getStatusIcon(item.status)}
              {index < todaysPlan.length - 1 && (
                <div className="w-0.5 flex-1 bg-slate-200 my-1" />
              )}
            </div>

            {/* Content */}
            <Card className={`flex-1 mb-3 ${item.status === 'upcoming' ? 'border-blue-200 bg-blue-50' : ''}`}>
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(item.type)}
                      <span className="font-medium text-sm text-slate-900">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                  {item.type === 'meeting' && item.status === 'upcoming' && (
                    <Button size="sm" className="h-7 text-xs bg-blue-600">
                      Join
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3">Tomorrow</h2>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-slate-900">Product Review</p>
                <p className="text-xs text-slate-500">11:00 AM • Conference Room A</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
