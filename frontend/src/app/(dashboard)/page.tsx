'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Mail,
  MessageSquare,
  Calendar,
  Play,
  ExternalLink,
} from 'lucide-react';

import emailsData from '@/data/mock/emails.json';
import slackData from '@/data/mock/slack.json';
import calendarData from '@/data/mock/calendar.json';

export default function DashboardPage() {
  const urgentCount = emailsData.filter(e => e.urgency === 'urgent').length + 
                      slackData.filter(s => s.urgency === 'urgent').length;
  const highCount = emailsData.filter(e => e.urgency === 'high').length + 
                    slackData.filter(s => s.urgency === 'high').length;
  const normalCount = emailsData.filter(e => e.urgency === 'normal').length + 
                      slackData.filter(s => s.urgency === 'normal').length;

  const topItems = [...emailsData, ...slackData]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);

  return (
    <div className="flex flex-col h-full">
      <Header title="AgentCEO Dashboard" />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Status Row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-green-700">Healthy</span>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <span className="text-sm text-slate-500">AWS: 18 in ago</span>
        </div>

        {/* Priority Badges */}
        <div className="flex gap-3">
          <Badge variant="destructive" className="px-3 py-1 text-sm">
            Urgent: {urgentCount}
          </Badge>
          <Badge className="px-3 py-1 text-sm bg-orange-100 text-orange-700 hover:bg-orange-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High: {highCount}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            Normal: {normalCount}
          </Badge>
        </div>

        {/* Top Priority Items */}
        <div className="space-y-3">
          {topItems.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-amber-500">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {item.provider === 'gmail' ? (
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">
                      {item.provider === 'gmail' ? 'Important: ' : ''}{item.summary}
                    </p>
                    <p className="text-sm text-slate-500">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {item.whyItMatters}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Draft
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Connection Status</CardTitle>
            <span className="text-sm text-slate-500">Last 60 mins</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span className="font-medium">Gmail</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                  Connected
                </Badge>
              </div>
            </div>
            <div className="text-sm text-slate-500 pl-8">
              Last sync: 2 min ago • 4 test coolts
            </div>
            <div className="flex gap-2 pl-8">
              <Button size="sm" variant="outline">Disconnect</Button>
              <Button size="sm" variant="outline">
                <CheckCircle className="h-4 w-4 mr-1" />
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Datadog Observability */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datadog Observability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 bg-slate-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-end px-4 pb-2">
                {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 55, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-0.5 bg-blue-500 rounded-t opacity-70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 absolute bottom-1 left-2">$ neo</span>
              <span className="text-xs text-slate-400 absolute bottom-1 right-2">AWS $0 minus</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">📊 Logs Fetched:</span>
                <span className="ml-2 font-medium">$48</span>
              </div>
              <div>
                <span className="text-slate-500">LLM Success</span>
                <span className="ml-2 font-medium">97%</span>
              </div>
              <div>
                <span className="text-slate-500">⊕ Error rate:</span>
                <span className="ml-2 font-medium">4%</span>
              </div>
              <div>
                <span className="text-slate-500">Error rate:</span>
                <span className="ml-2 font-medium">4%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Datadog Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
