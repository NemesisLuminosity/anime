import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CharacterCard from "@/components/CharacterCard";
import anime1 from "@/assets/anime1.jpg";
import anime2 from "@/assets/anime2.jpg";
import anime3 from "@/assets/anime3.jpg";
import anime4 from "@/assets/anime4.jpg";

const Characters = () => {
  const characters = [
    { name: "Kai Nakamura", image: anime1, anime: "Cyberpunk Chronicles", role: "Protagonist" },
    { name: "Yuki Tanaka", image: anime2, anime: "Neon Warriors", role: "Protagonist" },
    { name: "Shadow", image: anime3, anime: "Digital Detective", role: "Antagonist" },
    { name: "Miku Hoshino", image: anime4, anime: "Future Academy", role: "Supporting" },
    { name: "Ryu Yamamoto", image: anime1, anime: "Cyberpunk Chronicles", role: "Supporting" },
    { name: "Akira Sato", image: anime2, anime: "Neon Warriors", role: "Antagonist" },
    { name: "Emi Kuroda", image: anime3, anime: "Digital Detective", role: "Supporting" },
    { name: "Hiro Takeshi", image: anime4, anime: "Future Academy", role: "Protagonist" },
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Character Explorer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your favorite characters from across the anime universe
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-2 glass-strong rounded-lg p-2">
            <Search className="h-5 w-5 text-muted-foreground self-center ml-2" />
            <Input
              placeholder="Search characters..."
              className="bg-transparent border-0 focus-visible:ring-0"
            />
          </div>
          <Button variant="glass" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          {["All", "Protagonist", "Antagonist", "Supporting"].map((filter) => (
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

        {/* Characters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {characters.map((character, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CharacterCard {...character} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="glass" size="lg" className="hover-glow-purple">
            Load More Characters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Characters;
