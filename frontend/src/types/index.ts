export type Provider = 'gmail' | 'gcal' | 'slack' | 'youtube';
export type Urgency = 'urgent' | 'high' | 'normal' | 'low';
export type CardType = 'email' | 'event' | 'message' | 'video' | 'briefing';

export interface BaseItem {
  id: string;
  provider: Provider;
  type: CardType;
  timestamp: string;
  priorityScore: number;
  urgency: Urgency;
  summary: string;
  whyItMatters: string;
  suggestedAction: string;
  needsResponse?: boolean;
}

export interface EmailItem extends BaseItem {
  type: 'email';
  provider: 'gmail';
  from: string;
  fromName: string;
  to: string[];
  subject: string;
  snippet: string;
  threadId: string;
  isRead: boolean;
  labels: string[];
}

export interface SlackItem extends BaseItem {
  type: 'message';
  provider: 'slack';
  channel: string;
  from: string;
  avatar: string;
  content: string;
  threadCount: number;
  reactions: string[];
}

export interface YouTubeItem extends BaseItem {
  type: 'video';
  provider: 'youtube';
  title: string;
  channelName: string;
  channelAvatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  category: 'learning' | 'entertainment' | 'news';
}

export interface CalendarItem extends BaseItem {
  type: 'event';
  provider: 'gcal';
  title: string;
  startTime: string;
  endTime: string;
  attendees: { name: string; email: string }[];
  location: string;
  meetingLink?: string;
  description: string;
}

export type FeedItem = EmailItem | SlackItem | YouTubeItem | CalendarItem;

export interface Connection {
  provider: Provider;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSyncAt?: string;
  isMock?: boolean;
  details?: string;
}

export interface Draft {
  id: string;
  sourceItemId: string;
  provider: Provider;
  targetEmail?: string;
  targetChannel?: string;
  draftText: string;
  tone: 'professional' | 'friendly' | 'brief';
  status: 'pending' | 'approved' | 'sent' | 'rejected';
  createdAt: string;
}

export interface UserPreferences {
  tone: 'professional' | 'friendly' | 'brief';
  approvalRequired: boolean;
  timezone: string;
}
