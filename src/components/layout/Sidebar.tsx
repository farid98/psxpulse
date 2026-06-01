"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, Compass, Gauge } from "lucide-react";

const navLinks = [
  { label: "Market Overview", href: "/overview", icon: LayoutDashboard },
  { label: "My Portfolio", href: "/portfolio", icon: TrendingUp },
  { label: "Signals", href: "/signals", icon: Gauge },
  { label: "Scanner", href: "/discover", icon: Compass },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-[220px] bg-white border-r border-stone-200/80 hidden lg:flex flex-col py-6 z-20">
      <nav className="px-4 flex flex-col gap-px">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150 ${
                active
                  ? "bg-stone-100 text-stone-900"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2.5px] rounded-r-full bg-stone-900" />
              )}
              <Icon
                className={`w-[15px] h-[15px] shrink-0 ${
                  active ? "text-stone-900" : "text-stone-400 group-hover:text-stone-600"
                }`}
                strokeWidth={2}
              />
              <span className="tracking-[-0.005em]">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6 pb-2">
        <p className="text-[10px] text-stone-400 font-medium">PSXPulse v0.1</p>
        <p className="text-[10px] text-stone-300">End-of-day snapshot</p>
      </div>
    </aside>
  );
}
