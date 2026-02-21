// Mock Bedrock implementation for demo purposes
// Simulates AI responses without calling real API

export type MessageRole = 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

// Simulate processing delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock email triage
export async function triageEmail(email: {
  from: string;
  subject: string;
  body: string;
}): Promise<{
  urgency: 'urgent' | 'high' | 'normal' | 'low';
  summary: string;
  whyItMatters: string;
  suggestedAction: string;
}> {
  await delay(500 + Math.random() * 500); // Simulate API latency

  const subject = email.subject.toLowerCase();
  const from = email.from.toLowerCase();

  // Simple rule-based triage for demo
  if (subject.includes('urgent') || subject.includes('asap') || subject.includes('deadline')) {
    return {
      urgency: 'urgent',
      summary: `Urgent request from ${email.from.split('<')[0].trim()}`,
      whyItMatters: 'This email requires immediate attention based on urgency indicators.',
      suggestedAction: 'Review and respond within the hour',
    };
  }

  if (subject.includes('review') || subject.includes('approve') || subject.includes('sign')) {
    return {
      urgency: 'high',
      summary: `Action needed: ${email.subject}`,
      whyItMatters: 'Requires your approval or review to proceed.',
      suggestedAction: 'Review the attached materials and provide feedback',
    };
  }

  if (subject.includes('meeting') || subject.includes('calendar') || subject.includes('invite')) {
    return {
      urgency: 'normal',
      summary: `Meeting request: ${email.subject}`,
      whyItMatters: 'Calendar coordination needed.',
      suggestedAction: 'Check your availability and respond',
    };
  }

  return {
    urgency: 'normal',
    summary: email.subject,
    whyItMatters: 'Standard communication requiring your attention.',
    suggestedAction: 'Review and respond as needed',
  };
}

// Mock draft generation
export async function generateDraftReply(
  originalEmail: { from: string; subject: string; body: string },
  tone: 'professional' | 'friendly' | 'concise' = 'professional'
): Promise<string> {
  await delay(800 + Math.random() * 700); // Simulate API latency

  const senderName = originalEmail.from.split('<')[0].trim() || 'there';
  const subject = originalEmail.subject.toLowerCase();

  const greetings = {
    professional: `Dear ${senderName},`,
    friendly: `Hi ${senderName}!`,
    concise: `Hi,`,
  };

  const closings = {
    professional: 'Best regards',
    friendly: 'Thanks!',
    concise: 'Thanks',
  };

  // Generate contextual response based on subject
  let body = '';
  
  if (subject.includes('meeting') || subject.includes('schedule')) {
    body = tone === 'concise' 
      ? `That time works for me. I'll send a calendar invite.`
      : `Thank you for reaching out about scheduling a meeting. I've reviewed my calendar and would be happy to find a time that works for both of us.\n\nPlease let me know your availability, or feel free to send a calendar invite directly.`;
  } else if (subject.includes('review') || subject.includes('feedback')) {
    body = tone === 'concise'
      ? `I'll review this and get back to you by EOD.`
      : `Thank you for sending this over for review. I'll take a thorough look at the materials and provide my feedback.\n\nI should be able to get back to you with my thoughts by end of day. Please let me know if you need anything sooner.`;
  } else if (subject.includes('question') || subject.includes('help')) {
    body = tone === 'concise'
      ? `Happy to help. Let me look into this and get back to you.`
      : `Thank you for reaching out with your question. I'd be happy to help clarify this for you.\n\nLet me look into the details and I'll follow up with a comprehensive response shortly.`;
  } else {
    body = tone === 'concise'
      ? `Thanks for your email. I'll review and follow up soon.`
      : `Thank you for your email. I've received your message and will review the details carefully.\n\nI'll follow up with you shortly with any questions or next steps.`;
  }

  return `${greetings[tone]}\n\n${body}\n\n${closings[tone]}`;
}

// Mock chat responses
export async function chatWithAgent(
  messages: Message[],
  context?: { emails?: number; tasks?: number; meetings?: number }
): Promise<string> {
  await delay(600 + Math.random() * 600);

  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

  // Context-aware responses
  if (lastMessage.includes('urgent') || lastMessage.includes('attention')) {
    return `Based on my analysis, you have **2 urgent items** that need attention:\n\n1. **Q1 Contract Review** - Sarah Chen is waiting for sign-off, deadline is today at 5pm\n2. **PR Review Request** - Alex needs your review for the auth fix, blocking deployment\n\nWould you like me to draft a response for either of these?`;
  }

  if (lastMessage.includes('summarize') || lastMessage.includes('summary') || lastMessage.includes('day')) {
    const emailCount = context?.emails || 5;
    const meetingCount = context?.meetings || 2;
    return `Here's your day at a glance:\n\n📧 **${emailCount} emails** needing response\n💬 **2 Slack mentions** in #engineering\n📅 **${meetingCount} meetings** - Standup at 10am, 1:1 at 2pm\n🎬 **3 videos** recommended for later\n\n**Top priority:** Contract sign-off by 5pm\n\nWant me to help with any of these?`;
  }

  if (lastMessage.includes('calendar') || lastMessage.includes('schedule') || lastMessage.includes('meeting')) {
    return `Your schedule today:\n\n🕙 **10:00 AM** - Team Standup (Zoom)\n🕑 **2:00 PM** - 1:1 with Manager (Google Meet)\n\nYou have a **4-hour focus block** between meetings. Would you like me to protect this time or schedule something?`;
  }

  if (lastMessage.includes('draft') || lastMessage.includes('reply') || lastMessage.includes('email')) {
    return `I can help you draft a reply! Please tell me:\n\n1. Which email should I respond to?\n2. What tone would you prefer? (professional, friendly, or concise)\n\nOr just say "draft reply to Sarah" and I'll generate one for you.`;
  }

  if (lastMessage.includes('help') || lastMessage.includes('what can')) {
    return `I'm AgentCEO, your personal operations assistant! I can help you:\n\n✉️ **Triage emails** - Prioritize what needs attention\n📝 **Draft replies** - Generate responses in your tone\n📅 **Manage calendar** - See what's coming up\n✅ **Track tasks** - Stay on top of action items\n\nJust ask me anything like "What needs attention?" or "Summarize my day"`;
  }

  // Default response
  return `I understand you're asking about "${messages[messages.length - 1]?.content.substring(0, 50)}..."\n\nI can help you with:\n- Checking urgent items\n- Summarizing your day\n- Drafting email replies\n- Managing your calendar\n\nWhat would you like to focus on?`;
}
