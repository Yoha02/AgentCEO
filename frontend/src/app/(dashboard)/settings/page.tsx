'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Shield,
  Moon,
  MessageSquare,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [tone, setTone] = useState<'professional' | 'friendly' | 'brief'>('professional');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');

  const handleSave = () => {
    alert('Settings saved! (Demo)');
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Rules & Preferences" />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Approval Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Approval Settings
            </CardTitle>
            <CardDescription>
              Control how AgentCEO handles sending messages on your behalf
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Require Approval Before Sending</p>
                <p className="text-sm text-slate-500">
                  AgentCEO will always ask for your approval before sending any message
                </p>
              </div>
              <Button
                variant={approvalRequired ? 'default' : 'outline'}
                onClick={() => setApprovalRequired(!approvalRequired)}
                className={approvalRequired ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {approvalRequired ? 'ON' : 'OFF'}
              </Button>
            </div>
            
            {!approvalRequired && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  ⚠️ Warning: Disabling approval means AgentCEO can send messages automatically. 
                  We recommend keeping this ON for safety.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tone Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Default Tone
            </CardTitle>
            <CardDescription>
              Set the default tone for AI-generated responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {(['professional', 'friendly', 'brief'] as const).map((t) => (
                <Badge
                  key={t}
                  variant={tone === t ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 text-sm capitalize ${
                    tone === t ? 'bg-purple-600' : ''
                  }`}
                  onClick={() => setTone(t)}
                >
                  {t}
                </Badge>
              ))}
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                {tone === 'professional' && 'Formal, business-appropriate responses with clear structure.'}
                {tone === 'friendly' && 'Warm, conversational tone while remaining professional.'}
                {tone === 'brief' && 'Concise, to-the-point responses with minimal text.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-indigo-600" />
              Quiet Hours
            </CardTitle>
            <CardDescription>
              Pause notifications and non-urgent actions during these hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Enable Quiet Hours</span>
              <Button
                variant={quietHoursEnabled ? 'default' : 'outline'}
                onClick={() => setQuietHoursEnabled(!quietHoursEnabled)}
                className={quietHoursEnabled ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                {quietHoursEnabled ? 'ON' : 'OFF'}
              </Button>
            </div>
            
            {quietHoursEnabled && (
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm text-slate-500">Start</label>
                  <Input
                    type="time"
                    value={quietStart}
                    onChange={(e) => setQuietStart(e.target.value)}
                    className="w-32"
                  />
                </div>
                <span className="text-slate-400 mt-6">to</span>
                <div>
                  <label className="text-sm text-slate-500">End</label>
                  <Input
                    type="time"
                    value={quietEnd}
                    onChange={(e) => setQuietEnd(e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
