"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CoffeeLog } from "@/types/coffee";
import { BeanRating } from "@/components/ui/BeanRating";
import { formatRelativeDate } from "@/lib/utils/formatters";
import Link from "next/link";

const cafeIcon = L.divIcon({
  className: "",
  html: `<div style="width:32px;height:32px;background:#C4622D;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #A0501F;display:flex;align-items:center;justify-content:center;">
    <span style="transform:rotate(45deg);font-size:14px;line-height:1;margin-left:1px;margin-top:1px;">☕</span>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36],
});

function FitBounds({ logs }: { logs: CoffeeLog[] }) {
  const map = useMap();
  useEffect(() => {
    if (!logs.length) return;
    const bounds = L.latLngBounds(
      logs
        .filter((l) => l.latitude && l.longitude)
        .map((l) => [l.latitude!, l.longitude!])
    );
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
  }, [logs, map]);
  return null;
}

interface Props {
  logs: CoffeeLog[];
}

export function CafeMap({ logs }: Props) {
  const geoLogs = logs.filter((l) => l.latitude && l.longitude);
  const center: [number, number] =
    geoLogs.length > 0
      ? [
          geoLogs.reduce((s, l) => s + l.latitude!, 0) / geoLogs.length,
          geoLogs.reduce((s, l) => s + l.longitude!, 0) / geoLogs.length,
        ]
      : [0, 0];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <FitBounds logs={geoLogs} />
      {geoLogs.map((log) => (
        <Marker
          key={log.id}
          position={[log.latitude!, log.longitude!]}
          icon={cafeIcon}
        >
          <Popup>
            <div className="font-body text-espresso min-w-[160px]">
              <p className="font-display text-base leading-tight">{log.cafe_name}</p>
              <BeanRating value={log.overall_rating} size="sm" readOnly />
              <p className="text-xs text-muted mt-0.5">{formatRelativeDate(log.visited_at)}</p>
              <Link
                href={`/log/${log.id}`}
                className="text-xs text-terracotta underline mt-1 block"
              >
                View log →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
