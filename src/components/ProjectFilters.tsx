import React from 'react';
import { Search, X, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

export interface FilterCategory {
  label: string;
  value: string;
}

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: FilterCategory[];
  sortBy: 'updated' | 'newest' | 'oldest' | 'stars';
  onSortChange: (sort: 'updated' | 'newest' | 'oldest' | 'stars') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalCount: number;
  filteredCount: number;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search Bar & Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by repository name, topic, or language (e.g. react, movie)..."
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300 p-0.5 rounded"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & View Mode Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'updated' | 'newest' | 'oldest' | 'stars')}
              className="bg-transparent text-xs font-medium text-neutral-900 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="updated" className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">Recently Updated</option>
              <option value="newest" className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">Newest Created</option>
              <option value="oldest" className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">Oldest Created</option>
              <option value="stars" className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">Most Starred</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-lg border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/80 shadow-sm">
            <button
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              aria-label="List view"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-slate-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Segmented Filter Tabs */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-200 bg-slate-100 dark:border-neutral-800/80 dark:bg-neutral-950/80">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold dark:bg-neutral-800 dark:text-white'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Count indicator */}
        <div className="hidden sm:flex items-center text-xs font-mono text-neutral-500 shrink-0">
          Showing <span className="text-neutral-800 dark:text-neutral-300 font-semibold px-1">{filteredCount}</span> of {totalCount}
        </div>
      </div>
    </div>
  );
};
