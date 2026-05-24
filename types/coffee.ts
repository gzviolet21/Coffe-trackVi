import type { BrewMethodValue, FlavorNote } from "@/lib/constants";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface CoffeeLog {
  id: string;
  user_id: string;
  cafe_name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  coffee_name: string | null;
  brew_method: BrewMethodValue;
  overall_rating: number;
  vibe_score: number | null;
  flavor_notes: FlavorNote[];
  would_return: boolean | null;
  time_of_day: TimeOfDay;
  visited_at: string;
  notes: string | null;
  price: number | null;
  photo_url: string | null;
  photo_path: string | null;
  created_at: string;
  updated_at: string;
}

export type CoffeeLogInsert = Omit<CoffeeLog, "id" | "user_id" | "created_at" | "updated_at">;
