import { Search, TrendingUp, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimeCard from "@/components/AnimeCard";
import ParticleBackground from "@/components/ParticleBackground";
import heroBg from "@/assets/hero-bg.jpg";
import anime1 from "@/assets/anime1.jpg";
import anime2 from "@/assets/anime2.jpg";
import anime3 from "@/assets/anime3.jpg";
import anime4 from "@/assets/anime4.jpg";

const Home = () => {
  const trendingAnime = [
    {
      id: 1,
      title: "Cyberpunk Chronicles",
      image: anime1,
      rating: 9.2,
      year: 2024,
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Neon Warriors",
      image: anime2,
      rating: 8.9,
      year: 2024,
      genre: "Action",
    },
    {
      id: 3,
      title: "Digital Detective",
      image: anime3,
      rating: 8.7,
      year: 2023,
      genre: "Mystery",
    },
    {
      id: 4,
      title: "Future Academy",
      image: anime4,
      rating: 8.5,
      year: 2024,
      genre: "School",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Anime cityscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="gradient-text">Discover</span>
              <br />
              Your Next Anime
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore the ultimate anime database. Find your favorites, discover new series, and dive into a world of endless entertainment.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2 glass-strong rounded-full p-2 hover-glow-cyan">
                <Input
                  placeholder="Search for anime, characters, or genres..."
                  className="bg-transparent border-0 focus-visible:ring-0 text-lg"
                />
                <Button variant="neon" size="lg" className="rounded-full px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">10K+ Anime</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-secondary" />
                <span className="text-muted-foreground">500K+ Characters</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">1M+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full glass-strong flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Trending Now</span>
              </h2>
              <p className="text-muted-foreground">
                The hottest anime everyone is watching
              </p>
            </div>
            <Button variant="glass">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingAnime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="gradient-text">Explore by Genre</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Action", "Romance", "Sci-Fi", "Fantasy", "Horror", "Comedy", "Drama", "Mystery"].map(
              (genre) => (
                <button
                  key={genre}
                  className="glass-strong rounded-lg p-6 hover:scale-105 transition-all duration-300 hover-glow-cyan group"
                >
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {genre}
                  </h3>
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
