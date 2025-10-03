import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const RatingStars = ({ rating, onRate, readonly = false, size = "md" }: RatingStarsProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          disabled={readonly}
          className={cn(
            "transition-all duration-200",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating ? "text-primary fill-primary" : "text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
