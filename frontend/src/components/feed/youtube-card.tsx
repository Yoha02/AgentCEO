'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, Clock, Bookmark, X } from 'lucide-react';
import Image from 'next/image';
import type { YouTubeItem } from '@/types';

interface YouTubeCardProps {
  item: YouTubeItem;
  onWatch: () => void;
  onSaveForLater: () => void;
  onDismiss: () => void;
}

export function YouTubeCard({ item, onWatch, onSaveForLater, onDismiss }: YouTubeCardProps) {
  const categoryIcon = item.category === 'learning' ? (
    <BookOpen className="h-3 w-3" />
  ) : (
    <Play className="h-3 w-3" />
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-red-600 flex items-center justify-center">
              <Play className="h-3.5 w-3.5 text-white fill-white" />
            </div>
            <span className="text-sm font-medium text-slate-600">YouTube</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {categoryIcon}
              <span className="ml-1 capitalize">{item.category}</span>
            </Badge>
            <span className="text-xs text-slate-500">New</span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-slate-200">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {item.duration}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-900 line-clamp-2">{item.title}</h3>
          <p className="text-sm text-slate-600">{item.channelName} • {item.views} views</p>
        </div>

        {/* Why recommended */}
        <div className="flex items-start gap-2 mt-3 p-2 bg-blue-50 rounded-lg">
          <BookOpen className="h-4 w-4 text-blue-600 mt-0.5" />
          <p className="text-sm text-blue-800">Based on: {item.whyItMatters}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button onClick={onWatch} className="bg-red-600 hover:bg-red-700">
            <Play className="h-4 w-4 mr-1 fill-white" />
            Watch Now
          </Button>
          <Button onClick={onSaveForLater} variant="outline">
            <Bookmark className="h-4 w-4 mr-1" />
            Save for Later
          </Button>
          <Button onClick={onDismiss} variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
