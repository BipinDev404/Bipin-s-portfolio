import React from 'react';

export const ProjectSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-neutral-800/90 dark:bg-[#121417]/70 shadow-sm animate-pulse space-y-4">
      {/* Mock preview window skeleton */}
      <div className="aspect-[16/10] w-full rounded-lg bg-slate-200 dark:bg-neutral-800/70" />

      {/* Metadata strip skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-16 bg-slate-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-3 bg-slate-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-3 w-12 bg-slate-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-3 bg-slate-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-3 w-14 bg-slate-200 dark:bg-neutral-800 rounded" />
      </div>

      {/* Title skeleton */}
      <div className="h-5 w-3/4 bg-slate-200 dark:bg-neutral-800 rounded" />

      {/* Description lines skeleton */}
      <div className="space-y-2">
        <div className="h-3.5 w-full bg-slate-200 dark:bg-neutral-800/60 rounded" />
        <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-neutral-800/60 rounded" />
      </div>

      {/* Footer skeleton */}
      <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/60 flex items-center justify-between">
        <div className="h-3 w-28 bg-slate-200 dark:bg-neutral-800 rounded" />
        <div className="flex gap-2">
          <div className="h-4 w-4 bg-slate-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-4 w-4 bg-slate-200 dark:bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const FeaturedSkeleton: React.FC = () => {
  return (
    <div className="w-full mb-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-[#111316]/90 shadow-sm animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 aspect-[16/10] w-full rounded-xl bg-slate-200 dark:bg-neutral-800" />
        <div className="lg:col-span-5 space-y-4">
          <div className="h-3 w-24 bg-slate-200 dark:bg-neutral-800 rounded" />
          <div className="h-7 w-3/4 bg-slate-200 dark:bg-neutral-800 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-neutral-800/60 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-neutral-800/60 rounded" />
          <div className="pt-4 flex gap-2">
            <div className="h-6 w-16 bg-slate-200 dark:bg-neutral-800 rounded" />
            <div className="h-6 w-20 bg-slate-200 dark:bg-neutral-800 rounded" />
            <div className="h-6 w-16 bg-slate-200 dark:bg-neutral-800 rounded" />
          </div>
          <div className="pt-2 flex gap-3">
            <div className="h-9 w-28 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
            <div className="h-9 w-24 bg-slate-200 dark:bg-neutral-800 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
