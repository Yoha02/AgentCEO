'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
} from 'lucide-react';

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', value: 'you@company.com' },
      { icon: Globe, label: 'Timezone', value: 'Pacific Time' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', value: 'On' },
      { icon: Shield, label: 'Approval Required', value: 'On', highlight: true },
      { icon: Palette, label: 'Default Tone', value: 'Professional' },
      { icon: Moon, label: 'Quiet Hours', value: '10pm - 8am' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & FAQ', value: '' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Your Name</h2>
          <p className="text-sm text-slate-500">you@company.com</p>
          <Badge variant="secondary" className="mt-1 text-xs">Free Plan</Badge>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section) => (
        <section key={section.title}>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 px-1">
            {section.title}
          </h3>
          <Card>
            <CardContent className="p-0 divide-y">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-slate-500" />
                    <span className="text-sm text-slate-900">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.highlight ? (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {item.value}
                      </Badge>
                    ) : (
                      <span className="text-sm text-slate-500">{item.value}</span>
                    )}
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </section>
      ))}

      {/* Connections Quick Link */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900">Manage Connections</p>
              <p className="text-xs text-blue-700">Gmail, Calendar, Slack, YouTube</p>
            </div>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              Open
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>

      {/* Version */}
      <p className="text-center text-xs text-slate-400">
        AgentCEO v1.0.0 • Built for AWS Hackathon
      </p>
    </div>
  );
}
