import { useParams } from "react-router-dom";
import { Play, Plus, Check, Star, Calendar, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAnimeDetail, useAnimeCharacters } from "@/hooks/useAnimeData";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useRatings } from "@/hooks/useRatings";
import { useAuth } from "@/hooks/useAuth";
import CharacterCard from "@/components/CharacterCard";
import VideoPlayer from "@/components/VideoPlayer";
import RatingStars from "@/components/RatingStars";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const AnimeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: anime, isLoading } = useAnimeDetail(id || "");
  const { data: characters } = useAnimeCharacters(id || "");
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { userRating, averageRating, rateAnime } = useRatings(parseInt(id || "0"));
  const [reviewText, setReviewText] = useState("");

  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles(username, avatar_url)
        `)
        .eq('anime_id', parseInt(id || "0"))
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const submitReview = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          anime_id: parseInt(id || "0"),
          content,
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      setReviewText("");
      toast({
        title: "Review submitted",
        description: "Your review has been posted.",
      });
    },
  });

  const handleWatchlistToggle = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add to watchlist.",
        variant: "destructive",
      });
      return;
    }

    if (anime) {
      if (isInWatchlist(anime.mal_id)) {
        removeFromWatchlist(anime.mal_id);
      } else {
        addToWatchlist({
          animeId: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.large_image_url,
        });
      }
    }
  };

  const handleRating = (rating: number) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to rate anime.",
        variant: "destructive",
      });
      return;
    }
    rateAnime({ animeId: parseInt(id || "0"), rating });
  };

  if (isLoading || !anime) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <Skeleton className="w-full h-96" />
        </div>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(anime.mal_id);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover scale-110 blur-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex-shrink-0 animate-fade-in">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-64 h-96 object-cover rounded-lg glass-strong shadow-glow-cyan"
              />
            </div>

            <div className="flex-1 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 gradient-text">{anime.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-primary" fill="currentColor" />
                  <span className="font-semibold">{anime.score || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>{anime.year || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{anime.episodes || "?"} Episodes</span>
                </div>
                <div className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{anime.status || "Unknown"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres?.map((g: any) => (
                  <span key={g.mal_id} className="glass px-3 py-1 rounded-full text-sm text-primary">
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground mb-6 max-w-2xl">{anime.synopsis}</p>

              <div className="flex gap-4">
                {anime.trailer?.youtube_id && (
                  <Button variant="neon" size="lg" className="gap-2">
                    <Play fill="currentColor" className="h-5 w-5" />
                    Watch Trailer
                  </Button>
                )}
                <Button
                  variant={inWatchlist ? "glass" : "glass"}
                  size="lg"
                  className="gap-2"
                  onClick={handleWatchlistToggle}
                >
                  {inWatchlist ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {inWatchlist ? "In Watchlist" : "Add to List"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {anime.trailer?.youtube_id && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Trailer</span>
            </h2>
            <VideoPlayer youtubeId={anime.trailer.youtube_id} title={anime.title} />
          </div>
        </section>
      )}

      {/* Rating Section */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">
            <span className="gradient-text">Rate This Anime</span>
          </h2>

          {averageRating && (
            <div className="mb-6 glass-strong rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">
                  {averageRating.average.toFixed(1)}
                </div>
                <div>
                  <RatingStars rating={Math.round(averageRating.average)} readonly size="lg" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {averageRating.count} ratings
                  </p>
                </div>
              </div>
            </div>
          )}

          {user ? (
            <div className="glass-strong rounded-lg p-6">
              <p className="mb-4 font-semibold">Your Rating:</p>
              <RatingStars
                rating={userRating?.rating || 0}
                onRate={handleRating}
                size="lg"
              />
            </div>
          ) : (
            <div className="glass-strong rounded-lg p-6 text-center">
              <p className="text-muted-foreground">Sign in to rate this anime</p>
            </div>
          )}
        </div>
      </section>

      {/* Characters Section */}
      {characters && characters.length > 0 && (
        <section className="py-16 px-4 border-t border-border/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Characters & Voice Actors</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {characters.slice(0, 12).map((char: any, index: number) => (
                <CharacterCard
                  key={index}
                  name={char.character.name}
                  image={char.character.images.jpg.image_url}
                  anime={anime.title}
                  role={char.role}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">
            <span className="gradient-text">Community Reviews</span>
          </h2>

          {user && (
            <div className="glass-strong rounded-lg p-6 mb-8">
              <Textarea
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mb-4 bg-transparent"
                rows={4}
              />
              <Button
                variant="neon"
                onClick={() => submitReview.mutate(reviewText)}
                disabled={!reviewText.trim()}
              >
                Submit Review
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review: any) => (
                <div key={review.id} className="glass-strong rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary font-bold">
                      {review.profiles?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">
                          {review.profiles?.username || "Anonymous"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimeDetail;
