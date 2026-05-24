"use client";
import { useState, useEffect } from "react";

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  address: string | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    address: null,
    loading: false,
    error: null,
  });

  const detect = () => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let address: string | null = null;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { "User-Agent": "BrewNotes/1.0 (ghoziazmi@gmail.com)" } }
          );
          const data = await res.json();
          const d = data.address;
          address =
            [d.cafe, d.restaurant, d.amenity, d.road, d.city || d.town || d.village]
              .filter(Boolean)
              .slice(0, 3)
              .join(", ") || data.display_name?.split(",").slice(0, 2).join(", ");
        } catch {
          // reverse geocode failed — address stays null
        }

        setState({ lat, lng, address, loading: false, error: null });
      },
      (err) => {
        setState((s) => ({
          ...s,
          loading: false,
          error: err.code === 1 ? "Location access denied" : "Could not detect location",
        }));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    detect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, retry: detect };
}
