import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export const useWatchlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: watchlist, isLoading } = useQuery({
    queryKey: ['watchlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addToWatchlist = useMutation({
    mutationFn: async ({ animeId, title, image }: { animeId: number; title: string; image: string }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('watchlist')
        .insert({
          user_id: user.id,
          anime_id: animeId,
          anime_title: title,
          anime_image: image,
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      toast({
        title: "Added to watchlist",
        description: "Anime added to your watchlist successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add anime to watchlist.",
        variant: "destructive",
      });
    },
  });

  const removeFromWatchlist = useMutation({
    mutationFn: async (animeId: number) => {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('anime_id', animeId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      toast({
        title: "Removed from watchlist",
        description: "Anime removed from your watchlist.",
      });
    },
  });

  const isInWatchlist = (animeId: number) => {
    return watchlist?.some(item => item.anime_id === animeId) ?? false;
  };

  return {
    watchlist,
    isLoading,
    addToWatchlist: addToWatchlist.mutate,
    removeFromWatchlist: removeFromWatchlist.mutate,
    isInWatchlist,
  };
};
