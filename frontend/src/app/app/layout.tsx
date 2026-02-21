'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, MessageSquare, CalendarDays, Settings, Menu, Mic, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Home', href: '/app', icon: Home },
  { name: 'Chat', href: '/app/chat', icon: MessageSquare },
  { name: 'Plan', href: '/app/plan', icon: CalendarDays },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto border-x">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
                <Lightbulb className="h-5 w-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold">AgentCEO</span>
            </div>
            <nav className="space-y-2">
              <Link href="/" className="block p-2 rounded-lg hover:bg-slate-100">
                Open Dashboard
              </Link>
              <Link href="/app" className="block p-2 rounded-lg hover:bg-slate-100">
                Home
              </Link>
              <Link href="/app/chat" className="block p-2 rounded-lg hover:bg-slate-100">
                Chat with Agent
              </Link>
              <Link href="/app/plan" className="block p-2 rounded-lg hover:bg-slate-100">
                Today&apos;s Plan
              </Link>
              <Link href="/app/settings" className="block p-2 rounded-lg hover:bg-slate-100">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
            <Lightbulb className="h-5 w-5 text-slate-900" />
          </div>
          <span className="text-lg font-bold">AgentCEO</span>
        </div>

        <Button variant="ghost" size="icon">
          <Mic className="h-6 w-6" />
        </Button>
      </header>

      {/* Quick Stats Bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-slate-50">
        <Badge variant="destructive" className="text-xs">
          2 Urgent
        </Badge>
        <Badge variant="secondary" className="text-xs">
          Today: 15+
        </Badge>
        <div className="flex-1" />
        <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
          Sync Now
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around border-t bg-white py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/app' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-500'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
