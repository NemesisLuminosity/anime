import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimeCard from "@/components/AnimeCard";
import anime1 from "@/assets/anime1.jpg";
import anime2 from "@/assets/anime2.jpg";
import anime3 from "@/assets/anime3.jpg";
import anime4 from "@/assets/anime4.jpg";

const Browse = () => {
  const animeList = [
    { id: 1, title: "Cyberpunk Chronicles", image: anime1, rating: 9.2, year: 2024, genre: "Sci-Fi" },
    { id: 2, title: "Neon Warriors", image: anime2, rating: 8.9, year: 2024, genre: "Action" },
    { id: 3, title: "Digital Detective", image: anime3, rating: 8.7, year: 2023, genre: "Mystery" },
    { id: 4, title: "Future Academy", image: anime4, rating: 8.5, year: 2024, genre: "School" },
    { id: 5, title: "Cyber Legends", image: anime1, rating: 8.8, year: 2023, genre: "Adventure" },
    { id: 6, title: "Neon Dreams", image: anime2, rating: 9.0, year: 2024, genre: "Drama" },
    { id: 7, title: "Tech Revolution", image: anime3, rating: 8.6, year: 2024, genre: "Sci-Fi" },
    { id: 8, title: "Digital Hearts", image: anime4, rating: 8.4, year: 2023, genre: "Romance" },
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Browse Anime</span>
          </h1>
          <p className="text-muted-foreground">Explore thousands of anime series and movies</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex gap-2 glass-strong rounded-lg p-2">
            <Search className="h-5 w-5 text-muted-foreground self-center ml-2" />
            <Input
              placeholder="Search anime by title, genre, or studio..."
              className="bg-transparent border-0 focus-visible:ring-0"
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

        {/* Active Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {["All", "2024", "Sci-Fi", "Action", "Ongoing"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === "All"
                  ? "bg-primary text-primary-foreground shadow-glow-cyan"
                  : "glass hover:glass-strong hover-glow-cyan"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-primary font-semibold">{animeList.length}</span> results
          </p>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeList.map((anime, index) => (
            <div key={anime.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <AnimeCard {...anime} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="glass" size="lg" className="hover-glow-cyan">
            Load More Anime
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;
