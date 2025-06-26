
import { Card, CardContent } from '@/components/ui/card';

export const BookCardSkeleton = () => {
  return (
    <Card className="bg-white border-slate-200">
      <CardContent className="p-4">
        <div className="aspect-[3/4] mb-4 bg-slate-200 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-4 bg-slate-200 rounded w-16 animate-pulse" />
            <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
