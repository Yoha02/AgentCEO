# AgentCEO — Hackathon Build Proposal

## Executive Summary

Build a **personal operations assistant** that demonstrates the "AI agent" paradigm with real integrations. The demo will show: **connect Gmail → sync emails → triage with AI → draft reply → approve & send → see traces in Datadog**.

### Required Technologies (Per Hackathon Rules)
- ✅ **Amazon Bedrock** — LLM for triage, summarization, and draft generation
- ✅ **Datadog** — APM + Logs + Dashboard (LLM Observability stretch)
- ✅ **One Integration** — Gmail (OAuth + read + send)

---

## Build Real vs. Mock — Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WHAT WE BUILD REAL                               │
├─────────────────────────────────────────────────────────────────────┤
│  📧 Gmail Integration          Full OAuth, read, draft, SEND       │
│  🤖 Amazon Bedrock             Real AI triage + draft generation    │
│  📊 Datadog                    Real APM, traces, dashboard          │
│  🔐 AWS Cognito                Real auth + user sessions            │
│  💾 DynamoDB                   Real data persistence                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    WHAT WE MOCK (Looks Real)                        │
├─────────────────────────────────────────────────────────────────────┤
│  💬 Slack Messages             Static JSON, realistic content       │
│  🎬 YouTube Recommendations    Static JSON, real thumbnails         │
│  📅 Google Calendar            Static JSON, upcoming events         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    WHY THIS WORKS                                   │
├─────────────────────────────────────────────────────────────────────┤
│  • Gmail end-to-end proves the FULL agent loop works               │
│  • Mock data shows the VISION of multi-channel feeds               │
│  • Judges see polish + capability without 4x OAuth complexity      │
│  • Demo is reliable (mock data never fails)                        │
│  • Real email send is the "wow moment"                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Strategic Decisions for Hackathon Success

### What We're Building (Realistic Scope)

| Component | Build Approach | Why |
|-----------|---------------|-----|
| **Frontend** | Next.js (mobile-first responsive) | Fast to build, good demo visuals |
| **Backend** | Node.js/Express on AWS Lambda | Quick iteration, good Datadog integration |
| **Auth** | AWS Cognito | Required AWS, handles OAuth complexity |
| **Database** | DynamoDB | Serverless, AWS-native |
| **LLM** | Amazon Bedrock (Claude 3) | Required, excellent for tool calling |
| **Integration** | Gmail only (MVP) | Highest impact, most relatable demo |

### What We're Mocking/Skipping

| Feature | Decision | Rationale |
|---------|----------|-----------|
| Google Calendar | **Mock with static data** | OAuth is identical to Gmail; saves time, show "connected" status with fake events |
| Slack messages | **Mock with realistic static data** | Shows multi-channel capability without 2nd OAuth |
| YouTube recommendations | **Mock with curated static data** | Shows "media stream" concept, very visual in demo |
| Real cron jobs | **Manual "Sync Now" button** | Easier to demo, avoids timing issues |
| Neo4j memory | **Skip** | Nice-to-have, not required |
| Voice input | **Skip** | Not required, adds complexity |
| Full mobile app | **Responsive web only** | Web demo is faster to build |

---

## Feed Content Strategy: Build vs. Mock

The feed is a **mixed media stream** showing different content types. Here's how we handle each:

### Content Type Matrix

| Content Type | Source | Build/Mock | Demo Impact |
|--------------|--------|------------|-------------|
| **Emails** | Gmail | **BUILD REAL** | High — core demo flow |
| **Calendar Events** | Google Calendar | **MOCK** | Medium — shows "life context" |
| **Slack Messages** | Slack | **MOCK** | High — shows multi-channel |
| **YouTube Videos** | YouTube API | **MOCK** | High — visual wow factor |
| **Daily Briefing** | AI-generated | **BUILD REAL** | High — shows AI synthesis |

### How Mocking Works

**Principle:** Mock data looks real but comes from static JSON files that we control. User sees "Connected" status for mocked services, and the feed populates with realistic content.

#### Mock: Slack Messages
```json
// /data/mock/slack-messages.json
[
  {
    "id": "slack_001",
    "provider": "slack",
    "type": "message",
    "channel": "#engineering",
    "from": "Alex Chen",
    "avatar": "/avatars/alex.jpg",
    "content": "@you Can you review the PR for the auth fix? Blocking deployment.",
    "timestamp": "2026-02-20T09:30:00Z",
    "urgency": "high",
    "threadCount": 3,
    "reactions": ["👀", "🙏"]
  },
  {
    "id": "slack_002", 
    "provider": "slack",
    "type": "message",
    "channel": "#general",
    "from": "Sarah Kim",
    "content": "Team lunch moved to 1pm today",
    "timestamp": "2026-02-20T08:15:00Z",
    "urgency": "low"
  }
]
```

#### Mock: YouTube Recommendations
```json
// /data/mock/youtube-recommendations.json
[
  {
    "id": "yt_001",
    "provider": "youtube",
    "type": "video",
    "title": "Building AI Agents with AWS Bedrock - Full Tutorial",
    "channel": "Fireship",
    "thumbnail": "/thumbnails/bedrock-tutorial.jpg",
    "duration": "12:34",
    "views": "245K",
    "publishedAt": "2026-02-18T00:00:00Z",
    "whyRecommended": "Based on your interest in AI development",
    "category": "learning"
  },
  {
    "id": "yt_002",
    "provider": "youtube", 
    "type": "video",
    "title": "The Future of Personal AI Assistants",
    "channel": "MKBHD",
    "thumbnail": "/thumbnails/mkbhd-ai.jpg",
    "duration": "18:22",
    "views": "1.2M",
    "publishedAt": "2026-02-15T00:00:00Z",
    "whyRecommended": "Trending in Tech",
    "category": "entertainment"
  }
]
```

#### Mock: Calendar Events
```json
// /data/mock/calendar-events.json
[
  {
    "id": "cal_001",
    "provider": "gcal",
    "type": "event",
    "title": "Team Standup",
    "startTime": "2026-02-20T10:00:00Z",
    "endTime": "2026-02-20T10:30:00Z",
    "attendees": ["you@company.com", "alex@company.com", "sarah@company.com"],
    "location": "Zoom",
    "description": "Daily sync - discuss blockers"
  },
  {
    "id": "cal_002",
    "provider": "gcal",
    "type": "event", 
    "title": "1:1 with Manager",
    "startTime": "2026-02-20T14:00:00Z",
    "endTime": "2026-02-20T14:30:00Z",
    "attendees": ["you@company.com", "manager@company.com"],
    "description": "Weekly check-in"
  }
]
```

### Feed Merge Logic

The feed combines real + mock data into one unified stream:

```typescript
// Pseudocode for feed generation
async function generateFeed(userId: string): FeedCard[] {
  // Real data
  const emails = await fetchRealEmails(userId);       // Gmail API
  
  // Mock data (loaded from JSON files)
  const slackMessages = loadMockData('slack-messages.json');
  const youtubeVideos = loadMockData('youtube-recommendations.json');
  const calendarEvents = loadMockData('calendar-events.json');
  
  // Merge all sources
  const allItems = [
    ...emails.map(toFeedCard),
    ...slackMessages.map(toFeedCard),
    ...youtubeVideos.map(toFeedCard),
    ...calendarEvents.map(toFeedCard),
  ];
  
  // Sort by priority + recency
  return sortFeed(allItems);
}
```

### UI Card Designs by Type

Each content type has a distinct visual treatment in the feed:

#### Email Card
```
┌─────────────────────────────────────────────┐
│ 📧 Gmail              ● URGENT    2 min ago │
│─────────────────────────────────────────────│
│ Re: Q1 Contract Review                      │
│ From: client@company.com                    │
│                                             │
│ "Need your sign-off by EOD..."              │
│                                             │
│ 💡 Why: Deadline today, client thread       │
│                                             │
│ [Draft Reply]  [Snooze]  [Done]             │
└─────────────────────────────────────────────┘
```

#### Slack Card
```
┌─────────────────────────────────────────────┐
│ 💬 Slack #engineering         ● HIGH   30m  │
│─────────────────────────────────────────────│
│ Alex Chen                                   │
│ "@you Can you review the PR for auth fix?"  │
│                                             │
│ 💡 Why: Blocking teammate, mentioned you    │
│ 💬 3 replies                                │
│                                             │
│ [Open Thread]  [Quick Reply]  [Done]        │
└─────────────────────────────────────────────┘
```

#### YouTube Card
```
┌─────────────────────────────────────────────┐
│ 🎬 YouTube                    New    1h ago │
│─────────────────────────────────────────────│
│ ┌─────────────────────────────────────────┐ │
│ │ [VIDEO THUMBNAIL]              12:34    │ │
│ └─────────────────────────────────────────┘ │
│ Building AI Agents with AWS Bedrock         │
│ Fireship • 245K views                       │
│                                             │
│ 📚 Based on: Your interest in AI dev        │
│                                             │
│ [Watch Now]  [Save for Later]  [Not For Me] │
└─────────────────────────────────────────────┘
```

#### Calendar Card
```
┌─────────────────────────────────────────────┐
│ 📅 Calendar                   ⏰ In 25 min  │
│─────────────────────────────────────────────│
│ Team Standup                                │
│ 10:00 AM - 10:30 AM • Zoom                  │
│                                             │
│ 👥 Alex, Sarah, +2 others                   │
│                                             │
│ [Prep Notes]  [Join Meeting]  [Done]        │
└─────────────────────────────────────────────┘
```

### Connections Page UI

Shows all sources with their status (real or mocked):

```
┌─────────────────────────────────────────────┐
│ CONNECTIONS                                 │
│─────────────────────────────────────────────│
│                                             │
│ 📧 Gmail                    ● Connected     │
│    Last sync: 2 minutes ago                 │
│    [Disconnect]  [Test Connection]          │
│                                             │
│ 📅 Google Calendar          ● Connected     │
│    Last sync: 5 minutes ago      [DEMO]     │
│    [Disconnect]                             │
│                                             │
│ 💬 Slack                    ● Connected     │
│    #engineering, #general        [DEMO]     │
│    [Manage Channels]                        │
│                                             │
│ 🎬 YouTube                  ● Connected     │
│    Based on your preferences     [DEMO]     │
│    [Manage Topics]                          │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │  + Add Connection                       │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

> **[DEMO]** badge indicates mocked data — you can hide this badge for the actual hackathon demo if you want it to look fully real.

### Mock Data Architecture

The mock system is designed to be **easily swappable** for real integrations later:

```
/data
  /mock
    slack-messages.json      # 5-10 realistic Slack messages
    youtube-recommendations.json  # 5-8 video recommendations  
    calendar-events.json     # Today's calendar (3-5 events)
    
/backend/src/providers
    gmail.ts          # REAL - calls Gmail API
    slack.ts          # MOCK - loads from JSON, same interface
    youtube.ts        # MOCK - loads from JSON, same interface
    calendar.ts       # MOCK - loads from JSON, same interface
```

**Key Design Principle:** Mock providers implement the same interface as real providers:

```typescript
// All providers implement this interface
interface ContentProvider {
  name: string;
  sync(userId: string): Promise<Item[]>;
  getDetails(itemId: string): Promise<ItemDetails>;
  // Optional - only for providers that support actions
  sendReply?(itemId: string, content: string): Promise<void>;
}

// Real Gmail provider
class GmailProvider implements ContentProvider {
  async sync(userId: string) {
    const tokens = await getTokensFromSecretsManager(userId);
    const emails = await gmail.users.messages.list({ ... });
    return emails.map(normalizeEmail);
  }
}

// Mock Slack provider (same interface!)
class MockSlackProvider implements ContentProvider {
  async sync(userId: string) {
    const mockData = await loadJson('slack-messages.json');
    // Randomize timestamps to look "fresh"
    return mockData.map(msg => ({
      ...msg,
      timestamp: randomizeToRecent(msg.timestamp),
      isMock: true
    }));
  }
}
```

**Benefits:**
1. Feed code doesn't know/care if data is real or mock
2. Easy to swap mock → real when you add integrations later
3. Mock data can have perfect "demo scenarios" (urgent items, @mentions, etc.)
4. Timestamps are randomized on each sync to look fresh

### Mock Data Tips for Demo

**Make mock data tell a story:**
- Slack: Include a message that @mentions the user with urgency
- YouTube: Include videos related to the hackathon topic (AI, Bedrock)
- Calendar: Include a meeting "in 25 minutes" to show time-awareness

**Make it visually rich:**
- Use real YouTube thumbnails (just the image URLs)
- Use realistic avatar images for Slack users
- Use real company/channel names that feel authentic

---

## Demo Script (2-3 Minutes) — The "Gold Path"

This is what we MUST nail:

```
1. [0:00-0:15] Open dashboard, show "AgentCEO" branding + status healthy

2. [0:15-0:30] Show Connections page:
   - Gmail: Click "Connect" → OAuth flow → "Connected" ✓
   - Slack, Calendar, YouTube already show "Connected" (mocked)
   
3. [0:30-0:50] Click "Sync Now" → Feed populates with MIXED CONTENT:
   - 📧 Real emails from Gmail (with AI summaries)
   - 💬 Slack message: "@you review the PR?" (mocked but looks real)
   - 🎬 YouTube: "AI Agents Tutorial" recommendation (mocked)
   - 📅 Calendar: "Standup in 25 min" (mocked)

4. [0:50-1:20] Scroll feed — point out:
   - "Today's Focus" section (top 3 urgent items)
   - Different card types with distinct visuals
   - AI-generated "Why it matters" on each card
   - Urgency badges (red/orange/gray)

5. [1:20-1:50] Click urgent EMAIL card → "Draft Reply"
   - Bedrock generates contextual response
   - Show tone selector (Professional/Friendly)
   - Edit draft slightly
   - Click "Approve & Send" → EMAIL ACTUALLY SENDS!

6. [1:50-2:20] Switch to Datadog:
   - Show trace: UI → API → Bedrock → Gmail
   - Show sync job metrics
   - Show Bedrock p95 latency chart
   - "Full observability into every AI decision"

7. [2:20-2:40] Back to feed — show YouTube card:
   - "Watch Now" or "Save for Later"
   - "This is how AgentCEO surfaces relevant learning content"

8. [2:40-3:00] Wrap up:
   - "One feed for your entire digital life"
   - "AI triage so you focus on what matters"
   - "Approval-first for safety"
   - "Production observability built-in"
```

---

## Architecture (Simplified for Hackathon)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │  Dashboard  │  │    Feed     │  │  Approvals  │  │  Settings  │ │
│  │  (Overview) │  │  (Cards)    │  │  (Drafts)   │  │(Connections)│ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    AWS API Gateway + Lambda                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │  /auth/*    │  │  /feed/*    │  │  /drafts/*  │  │  /sync/*   │ │
│  │  (Cognito)  │  │  (Items)    │  │  (Bedrock)  │  │  (Gmail)   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
         │                │                │                │
         ▼                ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Cognito    │  │   DynamoDB   │  │   Bedrock    │  │  Gmail API   │
│   (Auth)     │  │   (Data)     │  │   (LLM)      │  │  (OAuth)     │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
         │                │                │                │
         └────────────────┴────────────────┴────────────────┘
                                │
                                ▼
                    ┌──────────────────────┐
                    │      Datadog         │
                    │  APM + Logs + Dash   │
                    └──────────────────────┘
```

---

## Data Model (DynamoDB Tables)

### Table: Users
```
PK: userId
- email: string
- timezone: string (default: "America/Los_Angeles")
- createdAt: timestamp
- preferences: {
    tone: "professional" | "friendly" | "brief",
    approvalRequired: boolean (default: true),
    quietHoursStart: string,
    quietHoursEnd: string
  }
```

### Table: Connections
```
PK: userId
SK: provider (e.g., "gmail", "gcal")
- status: "connected" | "disconnected" | "error"
- accessToken: string (encrypted ref to Secrets Manager)
- refreshToken: string (encrypted ref to Secrets Manager)
- lastSyncAt: timestamp
- tokenExpiresAt: timestamp
```

### Table: Items (Normalized content from all sources)
```
PK: userId
SK: itemId (e.g., "gmail#1234567890#abc123" or "slack#channel#msgid")
- provider: "gmail" | "gcal" | "slack" | "youtube"
- type: "email" | "event" | "message" | "video"
- timestamp: number
- isMock: boolean (true for demo data, false for real)

# Common fields
- priorityScore: number (0-100)
- needsResponse: boolean
- summary: string (AI-generated)
- whyItMatters: string (AI-generated)
- suggestedAction: string
- processedAt: timestamp

# Email-specific
- from: string
- to: string[]
- subject: string
- snippet: string
- threadId: string
- isRead: boolean
- labels: string[]

# Slack-specific  
- channel: string
- author: string
- avatar: string
- content: string
- threadCount: number
- reactions: string[]

# YouTube-specific
- title: string
- channelName: string
- thumbnail: string
- duration: string
- views: string
- category: "learning" | "entertainment" | "news"
- whyRecommended: string

# Calendar-specific
- eventTitle: string
- startTime: timestamp
- endTime: timestamp
- attendees: string[]
- location: string
- description: string
```

### Table: FeedCards
```
PK: userId
SK: cardId (e.g., "card#timestamp#uuid")
- cardType: "email" | "event" | "briefing" | "approval" | "slack" | "youtube"
- provider: "gmail" | "gcal" | "slack" | "youtube" | "system"
- isMock: boolean
- title: string
- summary: string
- whyItMatters: string
- urgency: "urgent" | "high" | "normal" | "low"
- actions: string[] (e.g., ["draft_reply", "snooze", "done", "watch", "open_thread"])
- sourceItemIds: string[]
- status: "active" | "snoozed" | "done"
- snoozedUntil: timestamp (optional)
- createdAt: timestamp

# Visual metadata
- thumbnail: string (for YouTube cards)
- avatar: string (for Slack cards)
- channelName: string (Slack channel or YouTube channel)
- duration: string (video length)
- eventTime: string (calendar event time display)
```

### Table: Drafts
```
PK: userId
SK: draftId
- sourceItemId: string
- provider: "gmail"
- targetThreadId: string
- targetEmail: string
- draftText: string
- tone: string
- status: "pending" | "approved" | "sent" | "rejected"
- createdAt: timestamp
- sentAt: timestamp (optional)
```

### Table: AuditLogs
```
PK: userId
SK: logId (timestamp#uuid)
- action: "sync" | "triage" | "draft_created" | "draft_approved" | "sent" | "snoozed" | "done"
- details: object
- traceId: string (Datadog trace ID)
- timestamp: number
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/preferences` | Update user preferences |

### Connections
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/connections` | List all connections with status |
| GET | `/api/connections/gmail/auth` | Start Gmail OAuth flow |
| GET | `/api/connections/gmail/callback` | OAuth callback handler |
| POST | `/api/connections/gmail/disconnect` | Disconnect Gmail |
| POST | `/api/connections/gmail/test` | Test connection health |

### Sync & Feed
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sync/now` | Trigger manual sync (demo button) |
| GET | `/api/feed` | Get feed cards (paginated) |
| GET | `/api/feed/:cardId` | Get card details |
| POST | `/api/feed/:cardId/snooze` | Snooze a card |
| POST | `/api/feed/:cardId/done` | Mark card as done |

### Drafts & Actions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/drafts` | Create draft reply (calls Bedrock) |
| GET | `/api/drafts` | List pending drafts |
| GET | `/api/drafts/:draftId` | Get draft details |
| PUT | `/api/drafts/:draftId` | Update draft text |
| POST | `/api/drafts/:draftId/approve` | Approve and send |
| POST | `/api/drafts/:draftId/reject` | Reject draft |

### Agent (Chat Interface)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/agent/chat` | Send message to AgentCEO |
| GET | `/api/agent/context` | Get today's context summary |

---

## Bedrock Prompts (Tool-Calling Approach)

### AgentCEO System Prompt
```
You are AgentCEO, a personal operations assistant. You help users manage their
communications by triaging, summarizing, and drafting responses.

RULES:
1. Always be concise and actionable
2. Never send messages without explicit user approval
3. Use tools for all data operations
4. Output structured JSON for UI rendering

AVAILABLE TOOLS:
- get_feed(limit, cursor): Get feed cards
- get_item_details(itemId): Get full item context
- create_draft(itemId, tone, instructions): Generate draft reply
- get_today_context(): Get calendar + priorities summary

OUTPUT FORMAT:
{
  "headline": "Brief status summary",
  "topPriorities": [
    {"cardId": "...", "reason": "...", "suggestedAction": "..."}
  ],
  "message": "Natural language response to user"
}
```

### Triage Prompt
```
Analyze this email and provide triage information:

EMAIL:
From: {from}
Subject: {subject}
Body: {snippet}
Timestamp: {timestamp}

Respond with JSON:
{
  "priorityScore": 0-100,
  "needsResponse": true/false,
  "urgency": "urgent" | "high" | "normal" | "low",
  "summary": "One sentence summary",
  "whyItMatters": "Why user should care",
  "suggestedAction": "draft_reply" | "read" | "archive" | "snooze"
}

SCORING GUIDELINES:
- 80-100: Urgent (deadlines today, client escalation, blocking issues)
- 60-79: High (needs response within 24h, important stakeholder)
- 40-59: Normal (informational, can wait)
- 0-39: Low (newsletters, notifications, FYI)
```

### Composer Prompt
```
Draft a reply to this email thread.

ORIGINAL EMAIL:
From: {from}
Subject: {subject}
Body: {body}

USER CONTEXT:
Tone preference: {tone}
Additional instructions: {instructions}

Write a concise, professional response that:
1. Addresses the main ask
2. Is appropriate for the tone setting
3. Does not include a greeting line (user will add)
4. Does not include a signature (user will add)

Respond with JSON:
{
  "draftText": "The response text",
  "confidence": 0.0-1.0,
  "notes": "Any caveats or suggestions"
}
```

---

## UI Screens (Priority Order)

### Phase 1: Core Screens (MUST HAVE for Demo)

#### 1. Dashboard Overview
- Status indicator (Healthy/Syncing/Error)
- "Sync Now" button (prominent)
- Urgent items count badge
- Pending drafts count
- Connection status summary
- Last sync timestamp

#### 2. Connections Page
- Gmail card with:
  - Connect/Disconnect button
  - Status badge
  - Last sync time
  - "Test Connection" button
- (Mock) Calendar card showing "Connected" with static events

#### 3. Feed Page
- Card list (scrollable)
- Each card shows:
  - Source icon (Gmail/Calendar)
  - Urgency badge (color-coded)
  - Subject/Title
  - Summary (1-2 lines)
  - "Why it matters" (1 line)
  - Action buttons: [Draft Reply] [Snooze] [Done]
- "Today's Focus" section at top (top 3-5 items)

#### 4. Card Detail / Draft View
- Full email context
- Generated draft (editable textarea)
- Tone selector (Professional/Friendly/Brief)
- [Regenerate] button
- [Approve & Send] button (prominent, green)
- [Cancel] button

### Phase 2: Nice-to-Have Screens

#### 5. Approvals Queue
- List of pending drafts
- Bulk approve option
- One-click approve per draft

#### 6. Observability Page
- Link to Datadog dashboard
- Recent sync job status
- Error count last 24h

#### 7. Rules & Preferences
- Tone default
- Approval-first toggle
- Quiet hours

---

## Build Phases (Step-by-Step with Verification)

### Phase 1: Project Scaffold (Day 1 Morning)
**Goal:** Deployed skeleton with health check

**Tasks:**
1. Initialize Next.js frontend with Tailwind CSS
2. Set up AWS SAM/CDK infrastructure template
3. Create Lambda handler for `/api/health`
4. Deploy to AWS (API Gateway + Lambda + S3/CloudFront)
5. Set up Datadog agent and basic APM

**Verification:**
- [ ] `https://your-domain.com` loads "AgentCEO"
- [ ] `/api/health` returns `{"status": "ok"}`
- [ ] Datadog shows the health check trace

**Files to Create:**
```
/frontend
  /app
    /page.tsx           # Landing/Dashboard
    /layout.tsx         # Root layout
  /components
    /ui/                # Reusable UI components
  tailwind.config.js
  package.json

/backend
  /src
    /handlers
      health.ts
    /lib
      datadog.ts
  template.yaml         # SAM template

/infra
  cdk.json             # If using CDK
```

---

### Phase 2: Authentication (Day 1 Afternoon)
**Goal:** User can sign in with Cognito

**Tasks:**
1. Create Cognito User Pool
2. Implement sign-in/sign-up UI
3. Create `/api/auth/me` endpoint
4. Store user in DynamoDB on first login
5. Set up JWT validation middleware

**Verification:**
- [ ] User can sign up with email
- [ ] User can sign in
- [ ] `/api/auth/me` returns user profile
- [ ] DynamoDB has user record

---

### Phase 3: Gmail OAuth Connection (Day 1 Evening)
**Goal:** Connect Gmail and store tokens securely

**Tasks:**
1. Set up Google Cloud Console project
2. Configure OAuth consent screen
3. Create OAuth credentials (client ID + secret)
4. Implement OAuth flow endpoints
5. Store tokens in AWS Secrets Manager
6. Create Connections table entry

**Verification:**
- [ ] "Connect Gmail" button starts OAuth
- [ ] Callback stores tokens
- [ ] Connections page shows "Connected"
- [ ] "Disconnect" removes tokens

**Required Secrets (Real Keys Needed):**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- AWS Secrets Manager ARN for token storage

---

### Phase 4: Email Sync (Day 2 Morning)
**Goal:** Fetch emails and store in DynamoDB

**Tasks:**
1. Implement Gmail API client
2. Create sync handler (fetch last 50 emails)
3. Normalize emails to Items schema
4. Store in DynamoDB
5. Update `lastSyncAt`
6. Add Datadog traces for sync job

**Verification:**
- [ ] "Sync Now" button triggers sync
- [ ] Items table populates with emails
- [ ] Datadog shows sync traces
- [ ] UI shows "Last sync: X minutes ago"

---

### Phase 5: Triage + Feed Generation (Day 2 Afternoon)
**Goal:** AI-powered email analysis and feed cards

**Tasks:**
1. Implement Bedrock client (Claude 3 Sonnet)
2. Create triage prompt
3. Process items through triage
4. Generate FeedCards
5. Implement `/api/feed` endpoint
6. Build Feed UI with cards

**Verification:**
- [ ] Each email gets priority score
- [ ] FeedCards table populates
- [ ] Feed UI shows cards with summaries
- [ ] Urgent items have red badges
- [ ] Datadog shows Bedrock call latency

**Required Keys:**
- AWS Bedrock access (IAM role with `bedrock:InvokeModel`)

---

### Phase 6: Draft Generation (Day 2 Evening)
**Goal:** Generate reply drafts with Bedrock

**Tasks:**
1. Create composer prompt
2. Implement `/api/drafts` POST endpoint
3. Build draft detail UI
4. Add tone selector
5. Implement regenerate functionality
6. Store drafts in DynamoDB

**Verification:**
- [ ] "Draft Reply" button generates draft
- [ ] Draft appears in UI (editable)
- [ ] Tone selector changes output
- [ ] "Regenerate" creates new draft
- [ ] Datadog traces show Bedrock calls

---

### Phase 7: Approve & Send (Day 3 Morning)
**Goal:** Actually send emails through Gmail

**Tasks:**
1. Implement Gmail send API
2. Create `/api/drafts/:id/approve` endpoint
3. Add confirmation dialog
4. Create AuditLog entry
5. Update draft status to "sent"

**Verification:**
- [ ] "Approve & Send" shows confirmation
- [ ] Email actually arrives in recipient inbox
- [ ] AuditLog has send record
- [ ] Draft status updates to "sent"
- [ ] Card disappears from feed (or shows "Sent" badge)

---

### Phase 8: Dashboard Polish (Day 3 Afternoon)
**Goal:** Demo-ready dashboard

**Tasks:**
1. Overview page with stats
2. Connection status cards
3. Urgent items counter
4. Pending drafts counter
5. "Today's Focus" section
6. Mock calendar events (static data)

**Verification:**
- [ ] Dashboard shows real-time stats
- [ ] Status indicators update
- [ ] Calendar shows mock events
- [ ] UI looks polished and professional

---

### Phase 9: Datadog Dashboard (Day 3 Evening)
**Goal:** Hackathon-winning observability

**Tasks:**
1. Create custom dashboard
2. Add sync job metrics panel
3. Add Bedrock latency chart (p50/p95)
4. Add trace list widget
5. Add error rate monitor
6. Add "drafts created → sent" funnel

**Dashboard Panels:**
1. **System Health** - API latency, error rate
2. **Sync Pipeline** - Items synced, sync duration, failures
3. **AI Performance** - Bedrock latency, token usage, success rate
4. **User Actions** - Drafts created, approved, sent
5. **Recent Traces** - Last 10 traces with deep links

**Verification:**
- [ ] Dashboard loads in Datadog
- [ ] Can click through to a trace
- [ ] Bedrock calls visible in traces
- [ ] Demo trace shows full flow

---

### Phase 10: Final Polish & Demo Prep (Day 4)
**Goal:** Bulletproof demo

**Tasks:**
1. End-to-end testing of gold path
2. Fix any UI glitches
3. Prepare demo script
4. Pre-seed test data if needed
5. Create backup plan for demo failures
6. Record backup video (just in case)

---

## Environment Variables Needed

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxx
NEXT_PUBLIC_REGION=us-east-1
```

### Backend (AWS Lambda environment)
```
# Cognito
COGNITO_USER_POOL_ID=us-east-1_xxxxx
COGNITO_CLIENT_ID=xxxxx

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
GOOGLE_REDIRECT_URI=https://api.your-domain.com/api/connections/gmail/callback

# AWS
DYNAMODB_TABLE_PREFIX=agentceo-
SECRETS_MANAGER_PREFIX=agentceo/
AWS_REGION=us-east-1

# Bedrock
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# Datadog
DD_API_KEY=xxxxx
DD_SERVICE=agentceo
DD_ENV=production
```

---

## What Requires REAL Keys vs Mock

### Must Have Real Keys (Demo Will Break Without)

| Service | Key/Credential | How to Get |
|---------|---------------|------------|
| **AWS** | IAM credentials | AWS Console → IAM |
| **Google OAuth** | Client ID + Secret | Google Cloud Console |
| **Datadog** | API Key | Datadog → Organization Settings |

### Can Mock/Simulate

| Feature | Mock Approach |
|---------|--------------|
| Calendar events | Static JSON array in code |
| Slack integration | Skip entirely |
| Email sending | Can demo with test email to self |
| Cron jobs | "Sync Now" button instead |

---

## Risk Mitigation

### Demo Day Backup Plans

1. **Gmail OAuth fails**: Pre-authorize before demo, have backup account
2. **Bedrock is slow**: Pre-generate some drafts, show them "cached"
3. **Network issues**: Have screen recording of successful flow
4. **Datadog dashboard empty**: Pre-populate with test traces day before

### Known Gotchas

1. **Gmail API quotas**: Don't spam sync during testing
2. **OAuth tokens expire**: Implement refresh token logic
3. **Bedrock cold start**: Keep Lambda warm or accept first-call latency
4. **CORS issues**: Configure API Gateway properly from start

---

## Technology Stack Summary

| Layer | Technology | Reasoning |
|-------|------------|-----------|
| Frontend | Next.js 14 + Tailwind + shadcn/ui | Fast to build, great DX, mobile-first |
| Backend | Node.js + TypeScript + Express | Quick iteration, good Datadog support |
| Infra | AWS SAM | Simpler than CDK for hackathon speed |
| Auth | AWS Cognito | Required AWS service |
| Database | DynamoDB | Serverless, no ops overhead |
| LLM | Amazon Bedrock (Claude 3 Sonnet) | Required per hackathon rules |
| Observability | Datadog APM + Logs | Required per hackathon rules |
| Integration | Gmail API | Highest demo impact |

---

## Open Questions (Need Your Input)

1. **Timeline**: How many days do we have until the hackathon demo?
2. **Team Size**: Is this solo or team build?
3. **AWS Account**: Do you have an AWS account with Bedrock access enabled?
4. **Google OAuth**: Do you have a Google Cloud project set up?
5. **Datadog Account**: Do you have a Datadog trial/account ready?
6. **Domain**: Do you need a custom domain or is `*.amazonaws.com` fine?

---

## Recommended Build Order (Optimized for Demo)

```
Day 1
├── [AM] Scaffold + Deploy skeleton
├── [PM] Cognito Auth working
└── [EVE] Gmail OAuth connected

Day 2
├── [AM] Email sync working
├── [PM] Triage + Feed cards
└── [EVE] Draft generation working

Day 3
├── [AM] Approve & Send working (END-TO-END COMPLETE!)
├── [PM] Dashboard polish
└── [EVE] Datadog dashboard

Day 4
├── [AM] Final testing
├── [PM] Demo rehearsal
└── [EVE] Buffer for fixes
```

---

## Next Steps

Once you confirm this proposal:

1. I'll scaffold the project structure
2. Create the SAM template for AWS infra
3. Build the frontend skeleton
4. Implement phase-by-phase with verification

**Reply with:**
- Answers to open questions
- Any scope changes you want
- Which phase to start with

Let's build this! 🚀
