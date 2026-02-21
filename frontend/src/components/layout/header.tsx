'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Coins } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Coins className="h-4 w-4" />
          <span>P0T</span>
        </div>
        
        <Button 
          onClick={handleSync} 
          disabled={syncing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </Button>
      </div>
    </header>
  );
}
