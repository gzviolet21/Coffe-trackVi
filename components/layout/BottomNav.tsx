"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { href: "/feed", label: "Journal", icon: "📖" },
  { href: "/log/new", label: "Log", icon: "＋", center: true },
  { href: "/stats", label: "Stats", icon: "✦" },
  { href: "/map", label: "Map", icon: "📍" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cream border-t border-cream-dark pb-safe z-50">
      <div className="flex items-end justify-around max-w-lg mx-auto px-2 pt-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href || (tab.href !== "/log/new" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 min-w-[56px] py-1 rounded-xl relative",
                tab.center && "mb-2"
              )}
            >
              {tab.center ? (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl bg-terracotta text-cream flex items-center justify-center text-2xl shadow-warm-md"
                >
                  {tab.icon}
                </motion.div>
              ) : (
                <>
                  <span className={cn("text-xl", active ? "opacity-100" : "opacity-40")}>
                    {tab.icon}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-body",
                      active ? "text-terracotta font-semibold" : "text-muted"
                    )}
                  >
                    {tab.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-terracotta"
                    />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
