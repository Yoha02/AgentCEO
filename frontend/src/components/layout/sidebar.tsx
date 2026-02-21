'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Rss,
  Link2,
  FileCheck,
  Settings,
  Activity,
  Lightbulb,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Connections', href: '/connections', icon: Link2 },
  { name: 'Feed Studio', href: '/feed', icon: Rss },
  { name: 'Approvals', href: '/approvals', icon: FileCheck },
  { name: 'Rules & Preferences', href: '/settings', icon: Settings },
  { name: 'Memory & Context', href: '/memory', icon: Lightbulb },
  { name: 'Audit Log', href: '/audit', icon: FileCheck },
  { name: 'Observability (Datadog)', href: '/observability', icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4 border-b border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
          <Lightbulb className="h-5 w-5 text-slate-900" />
        </div>
        <span className="text-xl font-bold">AgentCEO</span>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-2 px-4 py-3 text-xs text-slate-400 border-b border-slate-800">
        <span className="flex items-center gap-1">
          <span className="text-slate-500">☁</span> AWS Bedrock
        </span>
        <span className="flex items-center gap-1">
          <span className="text-slate-500">⏰</span> Pacific Time
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
