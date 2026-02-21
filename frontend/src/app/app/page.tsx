'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Mail,
  MessageSquare,
  Calendar,
  Play,
  Clock,
  ChevronRight,
  FileCheck,
  Lightbulb,
} from 'lucide-react';

import emailsData from '@/data/mock/emails.json';
import slackData from '@/data/mock/slack.json';
import youtubeData from '@/data/mock/youtube.json';
import calendarData from '@/data/mock/calendar.json';

export default function AppFeedPage() {
  const urgentItems = [...emailsData, ...slackData].filter(
    (item) => item.urgency === 'urgent' || item.urgency === 'high'
  ).slice(0, 2);

  const nextEvent = calendarData[0];

  return (
    <div className="p-4 space-y-6">
      {/* Approvals Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-slate-600" />
            <span className="font-semibold text-slate-900">Approvals</span>
            <Badge variant="secondary" className="text-xs">Pending 4</Badge>
          </div>
          <span className="text-xs text-slate-500">35 mins ago</span>
        </div>
      </section>

      {/* Today's Focus */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3">Today&apos;s Focus</h2>
        <div className="space-y-3">
          {/* Email Card - Compact */}
          <Card className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded bg-red-100 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-500">Gmail</span>
                    <span className="text-xs text-slate-400">2 mins ago</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm truncate">
                    Update on project timeline?
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    Needs response today, deadline approaching
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700">
                  Draft Reply
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Snooze
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Mark Done
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Card - Compact */}
          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-green-600">GC Project Standup</span>
                    <span className="text-xs text-slate-400">16 mins ago</span>
                  </div>
                  <p className="text-xs text-slate-500">25 mins</p>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    GC Project Standup
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Lightbulb className="h-3 w-3 text-amber-500" />
                    Discuss timeline, blockers, next steps.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">
                  Prep Notes
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Open
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  ✓ Mark Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* YouTube Recommendation */}
      <section>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-slate-200">
              <img
                src={youtubeData[0].thumbnail}
                alt={youtubeData[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-2 right-2 bg-red-600">
                <Play className="h-3 w-3 mr-1 fill-white" />
                YouTube
              </Badge>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-semibold text-sm line-clamp-2">
                  2 Months Later: iPad Pro M4 In-Depth Review!
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  New / MKBHD • 1 hr ago
                </p>
              </div>
            </div>
            <div className="flex gap-2 p-3">
              <Button size="sm" className="h-8 text-xs bg-red-600 hover:bg-red-700">
                <Play className="h-3 w-3 mr-1 fill-white" />
                Watch now
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Open
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                ✓ Mark Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Connection Status - Mini */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3">Connection Status</h2>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Manage Connections</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Gmail</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    OK
                  </Badge>
                  <span className="text-xs text-slate-400">2 mins ago</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 pl-6">
                Gmail OK mins ago
              </div>
              <div className="text-xs text-slate-500 pl-6">
                GGmail: OK 2 mins ago
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Mail className="h-3 w-3 mr-1" />
                Test Connection
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Reng-Connects
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pipeline Health */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-3">Pipeline Health</h2>
        <Card>
          <CardContent className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Gmail</span>
                <Badge variant="outline" className="text-xs">+</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">OK</Badge>
                <span className="text-xs text-slate-400">2 mins ago</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 pl-6">
              Gmail: OK. ⊕ host 89 &gt; One ags
            </div>
            <div className="bg-slate-50 rounded p-2 text-xs text-slate-600">
              Could you please send over the docs for the latest contract?
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs w-full">
              # Approve → &gt;
            </Button>

            {/* Another item */}
            <div className="border-t pt-3">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span className="text-sm">@annax</span>
                <span className="text-xs text-slate-400">19 mins ago</span>
                <div className="flex-1" />
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">OK</Badge>
                <span className="text-xs text-slate-400">2 mins ago</span>
              </div>
              <div className="text-xs text-slate-500 pl-8">
                Gmail: Fixing PR. (#87 bataclp operfanm.ago)
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                  Draft Reply
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  O Open Thread
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  O Snooze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
