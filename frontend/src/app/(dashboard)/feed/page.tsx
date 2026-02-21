'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailCard } from '@/components/feed/email-card';
import { SlackCard } from '@/components/feed/slack-card';
import { YouTubeCard } from '@/components/feed/youtube-card';
import { CalendarCard } from '@/components/feed/calendar-card';
import { DraftDialog } from '@/components/feed/draft-dialog';

import emailsData from '@/data/mock/emails.json';
import slackData from '@/data/mock/slack.json';
import youtubeData from '@/data/mock/youtube.json';
import calendarData from '@/data/mock/calendar.json';

import type { EmailItem, SlackItem, YouTubeItem, CalendarItem, FeedItem } from '@/types';

export default function FeedPage() {
  const [selectedItem, setSelectedItem] = useState<EmailItem | null>(null);
  const [showDraftDialog, setShowDraftDialog] = useState(false);

  // Combine all items and sort by priority
  const allItems = [
    ...emailsData.map(e => ({ ...e, type: 'email' as const, provider: 'gmail' as const })),
    ...slackData.map(s => ({ ...s, type: 'message' as const, provider: 'slack' as const })),
    ...youtubeData.map(y => ({ ...y, type: 'video' as const, provider: 'youtube' as const })),
    ...calendarData.map(c => ({ ...c, type: 'event' as const, provider: 'gcal' as const })),
  ].sort((a, b) => b.priorityScore - a.priorityScore);

  const todaysFocus = allItems.filter(item => item.priorityScore >= 60).slice(0, 5);
  const approvalCount = 4; // Mock count

  const handleDraftReply = (item: EmailItem) => {
    setSelectedItem(item);
    setShowDraftDialog(true);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Feed" />
      
      <div className="flex-1 overflow-auto">
        {/* Top bar with badges */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex items-center gap-4">
          <Badge variant="destructive" className="px-3 py-1">
            2 Urgent
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Today: 15+
          </Badge>
          <div className="flex-1" />
          <Badge variant="outline" className="px-3 py-1">
            👤 Approvals <span className="ml-1 text-blue-600">Pending {approvalCount}</span>
          </Badge>
        </div>

        <div className="p-6 space-y-6">
          {/* Today's Focus Section */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Today&apos;s Focus</h2>
            <div className="space-y-4">
              {todaysFocus.map((item) => {
                if (item.type === 'email') {
                  return (
                    <EmailCard
                      key={item.id}
                      item={item as unknown as EmailItem}
                      onDraftReply={() => handleDraftReply(item as unknown as EmailItem)}
                      onSnooze={() => {}}
                      onDone={() => {}}
                    />
                  );
                }
                if (item.type === 'message') {
                  return (
                    <SlackCard
                      key={item.id}
                      item={item as unknown as SlackItem}
                      onOpenThread={() => {}}
                      onQuickReply={() => {}}
                      onDone={() => {}}
                    />
                  );
                }
                if (item.type === 'event') {
                  return (
                    <CalendarCard
                      key={item.id}
                      item={item as unknown as CalendarItem}
                      onPrepNotes={() => {}}
                      onJoinMeeting={() => {}}
                      onDone={() => {}}
                    />
                  );
                }
                return null;
              })}
            </div>
          </section>

          {/* Media / Content Recommendations */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Good for Later</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {youtubeData.map((item) => (
                <YouTubeCard
                  key={item.id}
                  item={item as unknown as YouTubeItem}
                  onWatch={() => window.open('https://youtube.com', '_blank')}
                  onSaveForLater={() => {}}
                  onDismiss={() => {}}
                />
              ))}
            </div>
          </section>

          {/* All Items */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">All Items</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="slack">Slack</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-4">
                {allItems.map((item) => {
                  if (item.type === 'email') {
                    return (
                      <EmailCard
                        key={item.id}
                        item={item as unknown as EmailItem}
                        onDraftReply={() => handleDraftReply(item as unknown as EmailItem)}
                        onSnooze={() => {}}
                        onDone={() => {}}
                      />
                    );
                  }
                  if (item.type === 'message') {
                    return (
                      <SlackCard
                        key={item.id}
                        item={item as unknown as SlackItem}
                        onOpenThread={() => {}}
                        onQuickReply={() => {}}
                        onDone={() => {}}
                      />
                    );
                  }
                  if (item.type === 'event') {
                    return (
                      <CalendarCard
                        key={item.id}
                        item={item as unknown as CalendarItem}
                        onPrepNotes={() => {}}
                        onJoinMeeting={() => {}}
                        onDone={() => {}}
                      />
                    );
                  }
                  if (item.type === 'video') {
                    return (
                      <YouTubeCard
                        key={item.id}
                        item={item as unknown as YouTubeItem}
                        onWatch={() => {}}
                        onSaveForLater={() => {}}
                        onDismiss={() => {}}
                      />
                    );
                  }
                  return null;
                })}
              </TabsContent>
              <TabsContent value="email" className="space-y-4 mt-4">
                {emailsData.map((item) => (
                  <EmailCard
                    key={item.id}
                    item={item as unknown as EmailItem}
                    onDraftReply={() => handleDraftReply(item as unknown as EmailItem)}
                    onSnooze={() => {}}
                    onDone={() => {}}
                  />
                ))}
              </TabsContent>
              <TabsContent value="slack" className="space-y-4 mt-4">
                {slackData.map((item) => (
                  <SlackCard
                    key={item.id}
                    item={item as unknown as SlackItem}
                    onOpenThread={() => {}}
                    onQuickReply={() => {}}
                    onDone={() => {}}
                  />
                ))}
              </TabsContent>
              <TabsContent value="calendar" className="space-y-4 mt-4">
                {calendarData.map((item) => (
                  <CalendarCard
                    key={item.id}
                    item={item as unknown as CalendarItem}
                    onPrepNotes={() => {}}
                    onJoinMeeting={() => {}}
                    onDone={() => {}}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>

      {/* Draft Dialog */}
      <DraftDialog 
        open={showDraftDialog} 
        onOpenChange={setShowDraftDialog}
        item={selectedItem}
      />
    </div>
  );
}
