import { useQuery } from '@tanstack/react-query';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

interface JikanAnime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score: number;
  year: number;
  genres: Array<{ name: string }>;
  synopsis: string;
  episodes: number;
  status: string;
  trailer?: {
    youtube_id: string;
    url: string;
  };
}

export const useTopAnime = () => {
  return useQuery({
    queryKey: ['topAnime'],
    queryFn: async () => {
      const res = await fetch(`${JIKAN_API_BASE}/top/anime?limit=20`);
      const data = await res.json();
      return data.data as JikanAnime[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useAnimeSearch = (query: string) => {
  return useQuery({
    queryKey: ['animeSearch', query],
    queryFn: async () => {
      if (!query) return [];
      const res = await fetch(`${JIKAN_API_BASE}/anime?q=${encodeURIComponent(query)}&limit=20`);
      const data = await res.json();
      return data.data as JikanAnime[];
    },
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAnimeDetail = (id: string) => {
  return useQuery({
    queryKey: ['animeDetail', id],
    queryFn: async () => {
      const res = await fetch(`${JIKAN_API_BASE}/anime/${id}/full`);
      const data = await res.json();
      return data.data as JikanAnime;
    },
    enabled: !!id,
  });
};

export const useAnimeCharacters = (id: string) => {
  return useQuery({
    queryKey: ['animeCharacters', id],
    queryFn: async () => {
      const res = await fetch(`${JIKAN_API_BASE}/anime/${id}/characters`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!id,
  });
};

export const useSeasonalAnime = () => {
  return useQuery({
    queryKey: ['seasonalAnime'],
    queryFn: async () => {
      const res = await fetch(`${JIKAN_API_BASE}/seasons/now?limit=20`);
      const data = await res.json();
      return data.data as JikanAnime[];
    },
    staleTime: 1000 * 60 * 60,
  });
};
