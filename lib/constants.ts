export const BREW_METHODS = [
  { value: "espresso", label: "Espresso", emoji: "☕" },
  { value: "pour_over", label: "Pour Over", emoji: "🫖" },
  { value: "cold_brew", label: "Cold Brew", emoji: "🧊" },
  { value: "aeropress", label: "Aeropress", emoji: "⬛" },
  { value: "french_press", label: "French Press", emoji: "🫙" },
  { value: "moka_pot", label: "Moka Pot", emoji: "🏺" },
  { value: "other", label: "Other", emoji: "✨" },
] as const;

export const FLAVOR_NOTES = [
  "fruity",
  "floral",
  "nutty",
  "chocolatey",
  "caramel",
  "earthy",
  "spicy",
  "bright",
  "smooth",
  "bold",
  "acidic",
  "sweet",
] as const;

export const TIME_OF_DAY = [
  "morning",
  "afternoon",
  "evening",
  "night",
] as const;

export type BrewMethodValue = (typeof BREW_METHODS)[number]["value"];
export type FlavorNote = (typeof FLAVOR_NOTES)[number];
export type TimeOfDayValue = (typeof TIME_OF_DAY)[number];
