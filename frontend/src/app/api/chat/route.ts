import { NextRequest, NextResponse } from 'next/server';
import { chatWithAgent, Message } from '@/lib/bedrock';
import { traceLLMCall, logWithTrace } from '@/lib/datadog';

// POST /api/chat - Chat with AgentCEO
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing required field: messages (array)' },
        { status: 400 }
      );
    }

    logWithTrace('info', 'Chat request received', { messageCount: messages.length });

    // Chat with AI
    const response = await traceLLMCall(
      'chat',
      'anthropic.claude-3-sonnet',
      () => chatWithAgent(messages as Message[], context)
    );

    logWithTrace('info', 'Chat response generated');

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logWithTrace('error', 'Chat failed', { error: String(err) });
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
