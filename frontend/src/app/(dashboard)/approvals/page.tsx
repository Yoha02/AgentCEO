'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Send,
  Edit,
  X,
  CheckCircle,
  Clock,
  Mail,
} from 'lucide-react';

interface Draft {
  id: string;
  subject: string;
  to: string;
  draftText: string;
  tone: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'sent';
}

const mockDrafts: Draft[] = [
  {
    id: 'draft_001',
    subject: 'Re: Q1 Contract Review - Need Sign-off Today',
    to: 'sarah.chen@techcorp.com',
    draftText: 'Thank you for following up on the contract review. I understand the urgency with the client deadline today at 5pm.\n\nI have reviewed the contract and everything looks good from my end. I am approving this for sign-off.\n\nPlease proceed with sending it to the client.',
    tone: 'professional',
    createdAt: '2026-02-20T14:45:00Z',
    status: 'pending',
  },
  {
    id: 'draft_002',
    subject: 'Re: Partnership Proposal - Follow Up',
    to: 'mike.johnson@partner.io',
    draftText: 'Hi Mike,\n\nThank you for sending over the partnership proposal. I have had a chance to review it and I think there are some promising opportunities here.\n\nLet me discuss this with the team and get back to you by end of week.',
    tone: 'friendly',
    createdAt: '2026-02-20T13:30:00Z',
    status: 'pending',
  },
  {
    id: 'draft_003',
    subject: 'Re: Weekly Report Request',
    to: 'reports@company.com',
    draftText: 'Report attached. Let me know if you need anything else.',
    tone: 'brief',
    createdAt: '2026-02-20T12:00:00Z',
    status: 'pending',
  },
];

export default function ApprovalsPage() {
  const [drafts, setDrafts] = useState(mockDrafts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleApprove = (id: string) => {
    setDrafts(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status: 'sent' as const } : d
      )
    );
    alert('Email sent successfully! (Demo)');
  };

  const handleEdit = (draft: Draft) => {
    setEditingId(draft.id);
    setEditText(draft.draftText);
  };

  const handleSaveEdit = (id: string) => {
    setDrafts(prev =>
      prev.map(d =>
        d.id === id ? { ...d, draftText: editText } : d
      )
    );
    setEditingId(null);
  };

  const handleReject = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  const pendingDrafts = drafts.filter(d => d.status === 'pending');
  const sentDrafts = drafts.filter(d => d.status === 'sent');

  return (
    <div className="flex flex-col h-full">
      <Header title="Approvals" />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Summary */}
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1 text-lg">
            {pendingDrafts.length} Pending
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            {sentDrafts.length} Sent Today
          </Badge>
        </div>

        {/* Pending Drafts */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Pending Approval</h2>
          
          {pendingDrafts.length === 0 ? (
            <Card className="bg-slate-50">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-slate-600">All caught up! No drafts pending approval.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingDrafts.map((draft) => (
                <Card key={draft.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{draft.subject}</p>
                          <p className="text-sm text-slate-500">To: {draft.to}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">{draft.tone}</Badge>
                        <span className="text-xs text-slate-500">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {new Date(draft.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {/* Draft Content */}
                    {editingId === draft.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="min-h-[150px]"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSaveEdit(draft.id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-wrap">
                        {draft.draftText}
                      </div>
                    )}

                    {/* Actions */}
                    {editingId !== draft.id && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          onClick={() => handleApprove(draft.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Approve & Send
                        </Button>
                        <Button variant="outline" onClick={() => handleEdit(draft)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" onClick={() => handleReject(draft.id)}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Sent Today */}
        {sentDrafts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Sent Today</h2>
            <div className="space-y-4">
              {sentDrafts.map((draft) => (
                <Card key={draft.id} className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-slate-900">{draft.subject}</p>
                        <p className="text-sm text-slate-500">Sent to: {draft.to}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
