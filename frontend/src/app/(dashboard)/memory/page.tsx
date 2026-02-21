'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FolderOpen, MessageSquare, Lightbulb } from 'lucide-react';

const importantPeople = [
  { name: 'Sarah Chen', role: 'Client - TechCorp', interactions: 24 },
  { name: 'Mike Johnson', role: 'Partner - Partner.io', interactions: 12 },
  { name: 'Alex Chen', role: 'Engineering Lead', interactions: 89 },
  { name: 'Lisa Park', role: 'Manager', interactions: 45 },
];

const projects = [
  { name: 'Q1 Contract Review', status: 'active', items: 8 },
  { name: 'Partnership Proposal', status: 'active', items: 5 },
  { name: 'Product Launch', status: 'upcoming', items: 12 },
];

export default function MemoryPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Memory & Context" />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <p className="text-slate-600">
          AgentCEO learns from your interactions to provide better context and suggestions.
        </p>

        {/* Important People */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Important People
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {importantPeople.map((person) => (
                <div key={person.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{person.name}</p>
                    <p className="text-sm text-slate-500">{person.role}</p>
                  </div>
                  <Badge variant="secondary">{person.interactions} interactions</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-amber-600" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{project.name}</p>
                    <p className="text-sm text-slate-500">{project.items} related items</p>
                  </div>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences Learned */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600" />
              Preferences Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-800">📧 You prefer to respond to client emails within 2 hours</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-800">💬 You typically use a friendly tone with teammates</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-800">📅 You like 15-minute buffers between meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
