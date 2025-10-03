import { Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  genre: string;
}

const AnimeCard = ({ id, title, image, rating, year, genre }: AnimeCardProps) => {
  return (
    <Link to={`/anime/${id}`}>
      <div className="group relative overflow-hidden rounded-lg glass hover:glass-strong transition-all duration-500 hover:scale-105 hover-glow-cyan">
        {/* Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-strong rounded-full p-4 animate-pulse-glow">
                <Play className="h-8 w-8 text-primary" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 glass-strong rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 text-primary" fill="currentColor" />
            <span className="text-xs font-semibold">{rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{year}</span>
            <span className="px-2 py-1 rounded-full glass text-primary">{genre}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
