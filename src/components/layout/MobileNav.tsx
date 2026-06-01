"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  Gauge,
} from "lucide-react";

const mobileNavItems = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: TrendingUp },
  { label: "Signals", href: "/signals", icon: Gauge },
  { label: "Scanner", href: "/discover", icon: Compass },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-14 left-0 right-0 z-20 h-12 bg-white border-b border-stone-200/80 flex items-center lg:hidden">
      {mobileNavItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2"
          >
            {active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-t-full bg-stone-900" />
            )}
            <Icon
              className={`w-5 h-5 ${active ? "text-stone-900" : "text-stone-400"}`}
              strokeWidth={active ? 2.5 : 1.75}
            />
            <span
              className={`text-[10px] font-medium tracking-tight ${
                active ? "text-stone-900" : "text-stone-400"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
