"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/monitors", label: "Monitors", icon: ListChecks },
] as const;

interface Props {
  className?: string;
}

// ---------------------------------------------------------------------------
// Desktop top bar
// ---------------------------------------------------------------------------

export function Navbar({ className }: Props) {
  const pathname = usePathname();

  return (
    <>
      <NavigationMenu className={cn(className)}>
        <NavigationMenuList className="gap-5">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  className={cn(
                    "border-b-4 border-transparent",
                    "px-2 text-sm font-medium",
                    "hover:bg-brand-accent-fg",
                    active && "border-brand-accent bg-brand-accent-fg",
                  )}
                >
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
