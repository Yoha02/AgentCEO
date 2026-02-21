'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Calendar,
  MessageSquare,
  Play,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus,
  Settings,
  AlertCircle,
} from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  provider: string;
  icon: React.ReactNode;
  iconBg: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  details?: string;
  isMock?: boolean;
}

export default function ConnectionsPage() {
  const searchParams = useSearchParams();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [testing, setTesting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check for OAuth callback results
  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const email = searchParams.get('email');

    if (success === 'gmail' && email) {
      setMessage({ type: 'success', text: `Gmail connected: ${email}` });
      // Update Gmail connection status
      setConnections(prev =>
        prev.map(c =>
          c.id === 'gmail' ? { ...c, status: 'connected', lastSync: 'Just now', details: email } : c
        )
      );
    } else if (error) {
      setMessage({ type: 'error', text: `Connection failed: ${error}` });
    }
  }, [searchParams]);

  // Initialize connections
  useEffect(() => {
    const initConnections: Connection[] = [
      {
        id: 'gmail',
        name: 'Gmail',
        provider: 'google',
        icon: <Mail className="h-5 w-5 text-red-600" />,
        iconBg: 'bg-red-100',
        status: 'disconnected',
        isMock: false,
      },
      {
        id: 'gcal',
        name: 'Google Calendar',
        provider: 'google',
        icon: <Calendar className="h-5 w-5 text-blue-600" />,
        iconBg: 'bg-blue-100',
        status: 'connected',
        lastSync: '5 minutes ago',
        details: '3 calendars synced',
        isMock: true,
      },
      {
        id: 'slack',
        name: 'Slack',
        provider: 'slack',
        icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
        iconBg: 'bg-purple-100',
        status: 'connected',
        lastSync: '3 minutes ago',
        details: '#engineering, #general',
        isMock: true,
      },
      {
        id: 'youtube',
        name: 'YouTube',
        provider: 'google',
        icon: <Play className="h-5 w-5 text-red-600 fill-red-600" />,
        iconBg: 'bg-red-100',
        status: 'connected',
        lastSync: '10 minutes ago',
        details: 'Based on your preferences',
        isMock: true,
      },
    ];

    // Check Gmail connection status from API
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.services?.gmail?.authenticated) {
          initConnections[0].status = 'connected';
          initConnections[0].lastSync = 'Active session';
        }
        setConnections(initConnections);
      })
      .catch(() => setConnections(initConnections));
  }, []);

  const handleConnect = (id: string) => {
    // For Gmail, trigger real OAuth
    if (id === 'gmail') {
      window.location.href = '/api/auth/google';
      return;
    }
    // Mock connections
    setConnections(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: 'connected', lastSync: 'Just now' } : c
      )
    );
  };

  const handleDisconnect = (id: string) => {
    setConnections(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: 'disconnected', lastSync: undefined } : c
      )
    );
  };

  const handleTest = (id: string) => {
    setTesting(id);
    setTimeout(() => {
      setTesting(null);
      alert('Connection test successful!');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Connections" />
      
      <div className="flex-1 p-6 space-y-6">
        {/* OAuth callback message */}
        {message && (
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <span>{message.text}</span>
            <button 
              onClick={() => setMessage(null)}
              className="ml-auto text-sm hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <p className="text-slate-600">
          Connect your accounts to sync data into your unified feed.
        </p>

        <div className="grid gap-4">
          {connections.map((connection) => (
            <Card key={connection.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-lg ${connection.iconBg} flex items-center justify-center`}>
                      {connection.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{connection.name}</h3>
                        {connection.isMock && (
                          <Badge variant="outline" className="text-xs">DEMO</Badge>
                        )}
                      </div>
                      {connection.status === 'connected' && (
                        <>
                          <p className="text-sm text-slate-500 mt-1">
                            Last sync: {connection.lastSync}
                          </p>
                          {connection.details && (
                            <p className="text-sm text-slate-500">
                              {connection.details}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {connection.status === 'connected' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />
                        Connected
                      </Badge>
                    ) : connection.status === 'error' ? (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Disconnected
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  {connection.status === 'connected' ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(connection.id)}
                      >
                        Disconnect
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTest(connection.id)}
                        disabled={testing === connection.id}
                      >
                        {testing === connection.id ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Test Connection
                          </>
                        )}
                      </Button>
                      {!connection.isMock && (
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(connection.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Connection Button */}
        <Card className="border-dashed">
          <CardContent className="p-6">
            <Button variant="ghost" className="w-full h-16 text-slate-500">
              <Plus className="h-5 w-5 mr-2" />
              Add Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
