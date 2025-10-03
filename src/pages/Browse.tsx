import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnimeCard from "@/components/AnimeCard";
import { useAnimeSearch, useTopAnime } from "@/hooks/useAnimeData";
import { Skeleton } from "@/components/ui/skeleton";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const { data: searchResults, isLoading: searchLoading } = useAnimeSearch(debouncedQuery);
  const { data: topAnime, isLoading: topLoading } = useTopAnime();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery) {
        setSearchParams({ q: searchQuery });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, setSearchParams]);

  const animeList = debouncedQuery ? searchResults : topAnime;
  const isLoading = debouncedQuery ? searchLoading : topLoading;

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Browse Anime</span>
          </h1>
          <p className="text-muted-foreground">
            {debouncedQuery ? `Search results for "${debouncedQuery}"` : 'Explore thousands of anime series and movies'}
          </p>
        </div>

        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex gap-2 glass-strong rounded-lg p-2">
            <Search className="h-5 w-5 text-muted-foreground self-center ml-2" />
            <Input
              placeholder="Search anime by title, genre, or studio..."
              className="bg-transparent border-0 focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="glass" className="gap-2">
              <Filter className="h-4 w-4" />
              Genre
            </Button>
            <Button variant="glass" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        {animeList && animeList.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-primary font-semibold">{animeList.length}</span> results
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        ) : animeList && animeList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {animeList.map((anime, index) => (
              <div key={anime.mal_id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <AnimeCard
                  id={anime.mal_id}
                  title={anime.title}
                  image={anime.images.jpg.large_image_url}
                  rating={anime.score}
                  year={anime.year || 2024}
                  genre={anime.genres[0]?.name || "Anime"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No anime found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
