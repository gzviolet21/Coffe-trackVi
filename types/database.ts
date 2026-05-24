export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      coffee_logs: {
        Row: {
          id: string;
          user_id: string;
          cafe_name: string;
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          coffee_name: string | null;
          brew_method: string;
          overall_rating: number;
          vibe_score: number | null;
          flavor_notes: string[];
          would_return: boolean | null;
          time_of_day: string;
          visited_at: string;
          notes: string | null;
          price: number | null;
          photo_url: string | null;
          photo_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          cafe_name: string;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          coffee_name?: string | null;
          brew_method: string;
          overall_rating: number;
          vibe_score?: number | null;
          flavor_notes?: string[];
          would_return?: boolean | null;
          time_of_day: string;
          visited_at?: string;
          notes?: string | null;
          price?: number | null;
          photo_url?: string | null;
          photo_path?: string | null;
        };
        Update: {
          cafe_name?: string;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          coffee_name?: string | null;
          brew_method?: string;
          overall_rating?: number;
          vibe_score?: number | null;
          flavor_notes?: string[];
          would_return?: boolean | null;
          time_of_day?: string;
          visited_at?: string;
          notes?: string | null;
          price?: number | null;
          photo_url?: string | null;
          photo_path?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
