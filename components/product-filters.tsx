'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';

const platforms = ['PlayStation', 'Xbox', 'Nintendo', 'PC'];
const genres = ['Action RPG', 'First-Person Shooter', 'Action-Adventure', 'Platformer', 'RPG'];
const sorts = [
  { value: 'newest', label: 'Newest' },
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

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '1');
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.set('page', '1');
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {platforms.map((platform) => (
            <Button
              key={platform}
              variant={currentPlatform === platform ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => handleFilterChange('platform', platform)}
            >
              {platform}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Genre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={currentGenre === genre ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => handleFilterChange('genre', genre)}
            >
              {genre}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sorts.map((sort) => (
            <Button
              key={sort.value}
              variant={currentSort === sort.value ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => handleSortChange(sort.value)}
            >
              {sort.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
