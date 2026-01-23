'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';

const platforms = ['PlayStation', 'Xbox', 'Nintendo', 'PC'];
const genres = ['Action RPG', 'First-Person Shooter', 'Action-Adventure', 'Platformer', 'RPG'];
const sorts = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPlatform = searchParams.get('platform');
  const currentGenre = searchParams.get('genre');
  const currentSort = searchParams.get('sort') || 'newest';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '1');
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const FilterSection = ({ title, options, activeValue, filterKey }: any) => (
    <div className="mb-8">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">
        {title}
      </h3>
      <div className="space-y-1">
        {options.map((opt: any) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const label = typeof opt === 'string' ? opt : opt.label;
          const isActive = activeValue === value;

          return (
            <button
              key={value}
              onClick={() => updateFilters(filterKey, value)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <span>{label}</span>
              {isActive && <Check className="w-3 h-3" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="py-2">
      <FilterSection 
        title="Platform" 
        options={platforms} 
        activeValue={currentPlatform} 
        filterKey="platform" 
      />
      
      <span className="block h-px bg-border/40 my-6 mx-2" />
      
      <FilterSection 
        title="Genre" 
        options={genres} 
        activeValue={currentGenre} 
        filterKey="genre" 
      />

      <span className="block h-px bg-border/40 my-6 mx-2" />

      <FilterSection 
        title="Sort By" 
        options={sorts} 
        activeValue={currentSort} 
        filterKey="sort" 
      />
    </div>
  );
}
