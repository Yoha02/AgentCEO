# AgentCEO

A personal operations assistant that consolidates your digital life into one intelligent feed. Connect your accounts, let AI triage and prioritize, and take action with approval-first workflows.

## Features

- **Unified Feed** - Emails, calendar events, Slack messages, and YouTube recommendations in one place
- **AI Triage** - Automatic prioritization with urgency detection and smart summaries
- **Draft Generation** - AI-powered email replies with tone selection (professional, friendly, concise)
- **Approval Workflow** - Review and approve before any action is taken
- **Chat Interface** - Natural language interaction with your personal assistant
- **Daily Planning** - AI-generated schedule with tasks, meetings, and focus blocks

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui
- **AI**: AWS Bedrock (Claude 3) for triage, summarization, and drafts
- **Observability**: Datadog APM with LLM Observability
- **Integrations**: Gmail API (OAuth 2.0)

## Getting Started

### Prerequisites

- Node.js 20+
- AWS account with Bedrock access
- Datadog account
- Google Cloud project with Gmail API enabled

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
# AWS Bedrock
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1

# Datadog
DD_API_KEY=your_datadog_api_key
DD_SITE=datadoghq.com
DD_SERVICE=agentceo
DD_ENV=development

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the dashboard, or [http://localhost:3000/app](http://localhost:3000/app) for the mobile app experience.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (dashboard)/     # Dashboard pages (overview, connections, feed, etc.)
│   │   ├── app/             # Mobile app pages (home, chat, plan, settings)
│   │   └── api/             # API routes (chat, gmail, triage, health)
│   ├── components/
│   │   ├── feed/            # Feed card components
│   │   ├── layout/          # Sidebar, header
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Service integrations (bedrock, gmail, datadog)
│   └── data/mock/           # Mock data for demo
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Service health check |
| `/api/chat` | POST | Chat with AgentCEO |
| `/api/triage` | POST | Triage a single email |
| `/api/gmail/emails` | GET | Fetch and triage emails |
| `/api/gmail/draft` | POST | Generate AI draft reply |
| `/api/gmail/send` | POST | Send email (requires approval) |
| `/api/auth/google` | GET | Initiate Google OAuth |

## License

MIT
