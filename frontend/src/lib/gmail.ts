import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes required for Gmail access
export const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
];

// Generate OAuth URL for user authorization
export function getAuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
    prompt: 'consent',
  });
}

// Exchange authorization code for tokens
export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

// Create authenticated Gmail client
export function getGmailClient(accessToken: string, refreshToken?: string) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return google.gmail({ version: 'v1', auth });
}

// Fetch recent emails
export async function fetchEmails(
  accessToken: string,
  refreshToken?: string,
  maxResults: number = 10
) {
  const gmail = getGmailClient(accessToken, refreshToken);

  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults,
    q: 'in:inbox is:unread',
  });

  const messages = response.data.messages || [];
  const emails = [];

  for (const message of messages) {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id!,
      format: 'full',
    });

    const headers = msg.data.payload?.headers || [];
    const getHeader = (name: string) =>
      headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || '';

    // Get email body
    let body = '';
    const parts = msg.data.payload?.parts;
    if (parts) {
      const textPart = parts.find((p) => p.mimeType === 'text/plain');
      if (textPart?.body?.data) {
        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
      }
    } else if (msg.data.payload?.body?.data) {
      body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
    }

    emails.push({
      id: message.id,
      threadId: msg.data.threadId,
      from: getHeader('From'),
      to: getHeader('To'),
      subject: getHeader('Subject'),
      date: getHeader('Date'),
      snippet: msg.data.snippet || '',
      body: body.substring(0, 1000), // Limit body length
      labels: msg.data.labelIds || [],
    });
  }

  return emails;
}

// Send an email
export async function sendEmail(
  accessToken: string,
  refreshToken: string | undefined,
  to: string,
  subject: string,
  body: string,
  threadId?: string
) {
  const gmail = getGmailClient(accessToken, refreshToken);

  // Create MIME message
  const messageParts = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ];
  const message = messageParts.join('\n');
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId,
    },
  });

  return response.data;
}

// Create a draft
export async function createDraft(
  accessToken: string,
  refreshToken: string | undefined,
  to: string,
  subject: string,
  body: string,
  threadId?: string
) {
  const gmail = getGmailClient(accessToken, refreshToken);

  const messageParts = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ];
  const message = messageParts.join('\n');
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await gmail.users.drafts.create({
    userId: 'me',
    requestBody: {
      message: {
        raw: encodedMessage,
        threadId,
      },
    },
  });

  return response.data;
}

// Get user profile
export async function getUserProfile(accessToken: string, refreshToken?: string) {
  const gmail = getGmailClient(accessToken, refreshToken);
  const response = await gmail.users.getProfile({ userId: 'me' });
  return response.data;
}
