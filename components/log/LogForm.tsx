"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { BeanRating } from "@/components/ui/BeanRating";
import { BrewMethodChips } from "@/components/ui/BrewMethodChips";
import { FlavorChips } from "@/components/ui/FlavorChips";
import { ReturnToggle } from "@/components/ui/ReturnToggle";
import { TimeOfDaySelector } from "@/components/ui/TimeOfDaySelector";
import { PhotoUpload } from "@/components/ui/PhotoUpload";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { usePhotoUpload } from "@/lib/hooks/usePhotoUpload";
import { detectTimeOfDay } from "@/lib/utils/timeOfDay";
import { createClient } from "@/lib/supabase/client";
import { BREW_METHODS, TIME_OF_DAY } from "@/lib/constants";
import type { BrewMethodValue, FlavorNote, TimeOfDayValue } from "@/lib/constants";

const schema = z.object({
  cafe_name: z.string().min(1, "Café name is required"),
  address: z.string().optional(),
  coffee_name: z.string().optional(),
  brew_method: z.enum(BREW_METHODS.map((b) => b.value) as [string, ...string[]]),
  overall_rating: z.number().min(1, "Rating required").max(5),
  vibe_score: z.number().min(1).max(5).optional(),
  flavor_notes: z.array(z.string()).min(1, "Pick at least one flavor note"),
  would_return: z.boolean().optional(),
  time_of_day: z.enum(TIME_OF_DAY as unknown as [string, ...string[]]),
  notes: z.string().optional(),
  price: z.string().optional(),
  photo: z.instanceof(typeof window !== "undefined" ? File : Object).nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

interface FieldGroupProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

function FieldGroup({ label, children, error }: FieldGroupProps) {
  return (
    <div className="space-y-2">
      <p className="font-accent text-muted text-base">{label}</p>
      {children}
      {error && <p className="text-xs text-red-500 font-body">{error}</p>}
    </div>
  );
}

export function LogForm() {
  const router = useRouter();
  const geo = useGeolocation();
  const { upload, uploading } = usePhotoUpload();
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      brew_method: "espresso",
      overall_rating: 0,
      flavor_notes: [],
      time_of_day: detectTimeOfDay(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    let photo_url: string | null = null;
    let photo_path: string | null = null;

    if (data.photo instanceof File) {
      const result = await upload(data.photo, user.id);
      if (result) {
        photo_url = result.url;
        photo_path = result.path;
      }
    }

    const insertPayload = {
      cafe_name: data.cafe_name,
      address: data.address || geo.address || null,
      latitude: geo.lat,
      longitude: geo.lng,
      coffee_name: data.coffee_name || null,
      brew_method: data.brew_method,
      overall_rating: data.overall_rating,
      vibe_score: data.vibe_score ?? null,
      flavor_notes: data.flavor_notes,
      would_return: data.would_return ?? null,
      time_of_day: data.time_of_day,
      notes: data.notes || null,
      price: data.price ? parseFloat(data.price) : null,
      photo_url,
      photo_path,
      visited_at: new Date().toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: inserted, error } = await (supabase as any)
      .from("coffee_logs")
      .insert(insertPayload)
      .select("id")
      .single();

    setSubmitting(false);

    if (error) {
      if (photo_path) {
        await supabase.storage.from("coffee-photos").remove([photo_path]);
      }
      setToast("Something went wrong. Please try again.");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const id = (inserted as { id: string } | null)?.id;
    router.push(id ? `/log/${id}` : "/feed");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4 space-y-7 pb-32">
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-terracotta text-cream text-sm font-body px-4 py-3 rounded-xl"
        >
          {toast}
        </motion.div>
      )}

      <FieldGroup label="the café" error={errors.cafe_name?.message}>
        <input
          {...register("cafe_name")}
          placeholder="Café name"
          className="w-full bg-white border-2 border-cream-dark rounded-xl px-4 py-3 text-espresso font-body placeholder:text-muted focus:border-terracotta/50 focus:outline-none transition-colors"
        />
        <div className="flex items-center gap-2">
          <input
            {...register("address")}
            defaultValue={geo.address ?? ""}
            placeholder={geo.loading ? "Detecting location…" : "Address (optional)"}
            className="flex-1 bg-white border-2 border-cream-dark rounded-xl px-4 py-2.5 text-sm text-espresso font-body placeholder:text-muted focus:border-terracotta/50 focus:outline-none transition-colors"
          />
          {geo.error && (
            <button
              type="button"
              onClick={geo.retry}
              className="text-xs text-terracotta font-body underline shrink-0"
            >
              Retry
            </button>
          )}
        </div>
      </FieldGroup>

      <FieldGroup label="the coffee">
        <input
          {...register("coffee_name")}
          placeholder="Coffee name (optional)"
          className="w-full bg-white border-2 border-cream-dark rounded-xl px-4 py-3 text-espresso font-body placeholder:text-muted focus:border-terracotta/50 focus:outline-none transition-colors"
        />
      </FieldGroup>

      <FieldGroup label="brew method">
        <Controller
          name="brew_method"
          control={control}
          render={({ field }) => (
            <BrewMethodChips
              value={field.value as BrewMethodValue}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>

      <FieldGroup label="how was it?" error={errors.overall_rating?.message}>
        <div className="space-y-3">
          <div>
            <p className="font-body text-xs text-muted mb-1.5">Overall</p>
            <Controller
              name="overall_rating"
              control={control}
              render={({ field }) => (
                <BeanRating
                  value={field.value}
                  onChange={field.onChange}
                  size="lg"
                />
              )}
            />
          </div>
          <div>
            <p className="font-body text-xs text-muted mb-1.5">Vibe / atmosphere</p>
            <Controller
              name="vibe_score"
              control={control}
              render={({ field }) => (
                <BeanRating
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  size="md"
                />
              )}
            />
          </div>
        </div>
      </FieldGroup>

      <FieldGroup label="flavor notes" error={errors.flavor_notes?.message}>
        <Controller
          name="flavor_notes"
          control={control}
          render={({ field }) => (
            <FlavorChips
              value={field.value as FlavorNote[]}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>

      <FieldGroup label="would you return?">
        <Controller
          name="would_return"
          control={control}
          render={({ field }) => (
            <ReturnToggle
              value={field.value ?? null}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>

      <FieldGroup label="time of day">
        <Controller
          name="time_of_day"
          control={control}
          render={({ field }) => (
            <TimeOfDaySelector
              value={field.value as TimeOfDayValue}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>

      <FieldGroup label="price (optional)">
        <div className="flex items-center gap-1">
          <span className="text-muted font-body">$</span>
          <input
            {...register("price")}
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className="w-32 bg-white border-2 border-cream-dark rounded-xl px-4 py-2.5 text-espresso font-body placeholder:text-muted focus:border-terracotta/50 focus:outline-none transition-colors"
          />
        </div>
      </FieldGroup>

      <FieldGroup label="notes">
        <textarea
          {...register("notes")}
          placeholder="Anything else worth remembering..."
          rows={3}
          className="w-full bg-white border-2 border-cream-dark rounded-xl px-4 py-3 text-espresso font-body placeholder:text-muted focus:border-terracotta/50 focus:outline-none transition-colors resize-none"
        />
      </FieldGroup>

      <FieldGroup label="photo">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <PhotoUpload
              value={(field.value as File | null) ?? null}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>

      <motion.button
        type="submit"
        disabled={submitting || uploading}
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-2xl bg-terracotta text-cream font-display text-lg shadow-warm-md disabled:opacity-60 transition-opacity"
      >
        {submitting || uploading ? "Saving…" : "Save this sip ☕"}
      </motion.button>
    </form>
  );
}
