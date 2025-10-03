import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export const useRatings = (animeId?: number) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: userRating } = useQuery({
    queryKey: ['userRating', animeId, user?.id],
    queryFn: async () => {
      if (!user || !animeId) return null;
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('user_id', user.id)
        .eq('anime_id', animeId)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!animeId,
  });

  const { data: averageRating } = useQuery({
    queryKey: ['averageRating', animeId],
    queryFn: async () => {
      if (!animeId) return null;
      const { data, error } = await supabase
        .from('ratings')
        .select('rating')
        .eq('anime_id', animeId);
      
      if (error) throw error;
      if (!data || data.length === 0) return null;
      
      const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
      return {
        average: sum / data.length,
        count: data.length,
      };
    },
    enabled: !!animeId,
  });

  const rateAnime = useMutation({
    mutationFn: async ({ animeId, rating }: { animeId: number; rating: number }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('ratings')
        .upsert({
          user_id: user.id,
          anime_id: animeId,
          rating,
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userRating', variables.animeId] });
      queryClient.invalidateQueries({ queryKey: ['averageRating', variables.animeId] });
      toast({
        title: "Rating submitted",
        description: "Your rating has been saved.",
      });
    },
  });

  return {
    userRating,
    averageRating,
    rateAnime: rateAnime.mutate,
  };
};
