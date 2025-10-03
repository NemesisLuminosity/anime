// Replace this file by running the Supabase CLI types generator for your project.
// npx supabase gen types typescript --project-id <project-ref> > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; username: string | null; avatar_url: string | null }
        Insert: { id: string; username?: string | null; avatar_url?: string | null }
        Update: { id?: string; username?: string | null; avatar_url?: string | null }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


