import { useParams } from "react-router-dom";
import { Play, Plus, Star, Calendar, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import CharacterCard from "@/components/CharacterCard";
import anime1 from "@/assets/anime1.jpg";
import anime2 from "@/assets/anime2.jpg";
import anime3 from "@/assets/anime3.jpg";

const AnimeDetail = () => {
  const { id } = useParams();

  // Mock data
  const anime = {
    title: "Cyberpunk Chronicles",
    image: anime1,
    rating: 9.2,
    year: 2024,
    episodes: 24,
    status: "Ongoing",
    genre: ["Sci-Fi", "Action", "Drama"],
    synopsis:
      "In a neon-lit future where technology and humanity collide, a young hacker discovers a conspiracy that threatens the very fabric of their digital world. As they dive deeper into the mystery, they must navigate through corporate espionage, rogue AI, and their own past.",
    studio: "Futuristic Animation Studios",
  };

  const characters = [
    { name: "Kai Nakamura", image: anime1, anime: anime.title, role: "Protagonist" },
    { name: "Yuki Tanaka", image: anime2, anime: anime.title, role: "Supporting" },
    { name: "Shadow", image: anime3, anime: anime.title, role: "Antagonist" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-full object-cover scale-110 blur-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="flex-shrink-0 animate-fade-in">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-64 h-96 object-cover rounded-lg glass-strong shadow-glow-cyan"
              />
            </div>

            {/* Info */}
            <div className="flex-1 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 gradient-text">{anime.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-primary" fill="currentColor" />
                  <span className="font-semibold">{anime.rating}</span>
                </div>
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>{anime.year}</span>
                </div>
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{anime.episodes} Episodes</span>
                </div>
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{anime.status}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genre.map((g) => (
                  <span key={g} className="glass px-3 py-1 rounded-full text-sm text-primary">
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground mb-6 max-w-2xl">{anime.synopsis}</p>

              <div className="flex gap-4">
                <Button variant="neon" size="lg" className="gap-2">
                  <Play fill="currentColor" className="h-5 w-5" />
                  Watch Now
                </Button>
                <Button variant="glass" size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Add to List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Characters Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <span className="gradient-text">Main Characters</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {characters.map((character, index) => (
              <CharacterCard key={index} {...character} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <span className="gradient-text">Community Reviews</span>
          </h2>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass-strong rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary font-bold">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">User{i}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-primary" fill="currentColor" />
                        <span className="text-sm">{9 + i * 0.1}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Amazing anime with stunning visuals and a gripping storyline. The character development is top-notch, and the cyberpunk setting is incredibly immersive.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimeDetail;
