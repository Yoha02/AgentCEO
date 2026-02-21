import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

// Import mock implementations
import * as MockBedrock from './mock-bedrock';

// Check if we should use mock
const USE_MOCK = process.env.USE_MOCK_LLM === 'true';

const client = USE_MOCK ? null : new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export type MessageRole = 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface BedrockResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

// Use Claude 3 Sonnet on Bedrock
const MODEL_ID = 'anthropic.claude-3-sonnet-20240229-v1:0';

export async function invokeClaudeModel(
  messages: Message[],
  systemPrompt?: string
): Promise<BedrockResponse> {
  // Use mock if configured
  if (USE_MOCK || !client) {
    const response = await MockBedrock.chatWithAgent(messages);
    return {
      content: response,
      usage: { inputTokens: 100, outputTokens: 150 },
    };
  }

  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 1024,
    system: systemPrompt || 'You are AgentCEO, a helpful personal operations assistant.',
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };

  const command = new InvokeModelCommand({
    modelId: MODEL_ID,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify(payload),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));

  return {
    content: responseBody.content[0].text,
    usage: {
      inputTokens: responseBody.usage?.input_tokens || 0,
      outputTokens: responseBody.usage?.output_tokens || 0,
    },
  };
}

// Triage email and determine urgency + summary
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
  // Use mock if configured
  if (USE_MOCK) {
    return MockBedrock.triageEmail(email);
  }

  const systemPrompt = `You are AgentCEO, an AI assistant that triages emails.
Analyze the email and return a JSON object with:
- urgency: "urgent" | "high" | "normal" | "low"
- summary: A 1-2 sentence summary
- whyItMatters: Why this email is important to the user
- suggestedAction: What action the user should take

Return ONLY valid JSON, no other text.`;

  const userMessage = `From: ${email.from}
Subject: ${email.subject}
Body: ${email.body}`;

  const response = await invokeClaudeModel(
    [{ role: 'user', content: userMessage }],
    systemPrompt
  );

  try {
    return JSON.parse(response.content);
  } catch {
    return {
      urgency: 'normal',
      summary: email.subject,
      whyItMatters: 'Email requires your attention',
      suggestedAction: 'Review and respond',
    };
  }
}

// Generate a draft reply
export async function generateDraftReply(
  originalEmail: { from: string; subject: string; body: string },
  tone: 'professional' | 'friendly' | 'concise' = 'professional'
): Promise<string> {
  // Use mock if configured
  if (USE_MOCK) {
    return MockBedrock.generateDraftReply(originalEmail, tone);
  }

  const systemPrompt = `You are AgentCEO, drafting email replies on behalf of the user.
Write a ${tone} reply to the email. Be helpful and actionable.
Return ONLY the email body text, no subject line or greeting formatting.`;

  const userMessage = `Original email from ${originalEmail.from}:
Subject: ${originalEmail.subject}
Body: ${originalEmail.body}

Draft a ${tone} reply.`;

  const response = await invokeClaudeModel(
    [{ role: 'user', content: userMessage }],
    systemPrompt
  );

  return response.content;
}

// Chat with AgentCEO
export async function chatWithAgent(
  messages: Message[],
  context?: { emails?: number; tasks?: number; meetings?: number }
): Promise<string> {
  // Use mock if configured
  if (USE_MOCK) {
    return MockBedrock.chatWithAgent(messages, context);
  }

  const systemPrompt = `You are AgentCEO, a personal operations assistant.
You help users manage their emails, calendar, and tasks.
${context ? `Current context: ${context.emails || 0} emails, ${context.tasks || 0} tasks, ${context.meetings || 0} meetings today.` : ''}
Be concise, helpful, and actionable. Use markdown formatting for lists and emphasis.`;

  const response = await invokeClaudeModel(messages, systemPrompt);
  return response.content;
}
