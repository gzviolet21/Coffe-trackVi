"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function usePhotoUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (
    file: File,
    userId: string
  ): Promise<{ url: string; path: string } | null> => {
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;

    setUploading(true);
    try {
      const { error } = await supabase.storage
        .from("coffee-photos")
        .upload(path, file, { contentType: file.type });

      if (error) throw error;

      const { data } = supabase.storage
        .from("coffee-photos")
        .getPublicUrl(path);

      return { url: data.publicUrl, path };
    } catch {
      return null;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (path: string) => {
    const supabase = createClient();
    await supabase.storage.from("coffee-photos").remove([path]);
  };

  return { upload, remove, uploading };
}
