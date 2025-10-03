import { Heart } from "lucide-react";

interface CharacterCardProps {
  name: string;
  image: string;
  anime: string;
  role: string;
}

const CharacterCard = ({ name, image, anime, role }: CharacterCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg glass hover:glass-strong transition-all duration-500 hover:scale-105 hover-glow-purple">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-lg mb-1">{name}</h3>
            <p className="text-xs text-muted-foreground mb-1">{anime}</p>
            <span className="text-xs px-2 py-1 rounded-full glass-strong text-accent inline-block">
              {role}
            </span>
          </div>
        </div>

        {/* Like button */}
        <button className="absolute top-2 right-2 glass-strong rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
          <Heart className="h-4 w-4 text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
