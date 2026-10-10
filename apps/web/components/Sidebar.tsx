"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, ListChecks, Home, Plus } from "lucide-react";
import { Branding } from "./Branding";
import { Profile } from "./Profile";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SIDEBAR_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/monitors", label: "Monitors", icon: ListChecks },
] as const;

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AppSidebar({ className }: Pick<Props, "className">) {
  return (
    <Sidebar className={cn("", className)}>
      {/* <SidebarHeader>
        <Branding />
      </SidebarHeader> */}
      <SidebarContent className="py-5 bg-brand-secondary">
        <SidebarGroup>
          <SidebarMenu>
            {SIDEBAR_LINKS.map(({ label, icon: Icon, href }) => (
              <SidebarMenuItem key={label} className="text-brand-secondary-fg">
                <SidebarMenuButton
                  render={<Link href={href} className="flex flex-row gap-5" />}
                >
                  <Icon className="size-5!" />
                  <span className="text-base uppercase">{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <MonitorNowCta />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-1 bg-brand-primary text-brand-primary-fg">
        <Button
          variant="ghost"
          className="border-t flex gap-2 justify-start cursor-pointer"
        >
          <Profile userInitial="MP" />
          <span className="text-base uppercase">Profile</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebarTrigger({ className }: Pick<Props, "className">) {
  const { toggleSidebar } = useSidebar();
  return (
    <>
      <Button
        variant={"ghost"}
        onClick={toggleSidebar}
        className={cn("p-0", className)}
      >
        <Menu className="size-full" />
      </Button>
    </>
  );
}

export function AppSidebarProvider({ children }: Props) {
  return (
    <>
      <SidebarProvider>{children}</SidebarProvider>
    </>
  );
}

export function MonitorNowCta({ className }: { className?: string }) {
  return (
    <>
      <Button
        variant={"outline"}
        className={cn(
          "cursor-pointer bg-brand-accent text-brand-accent-fg hover:bg-brand-primary",
          className,
        )}
      >
        <span className="uppercase text-base font-semibold">Monitor now</span>
        <Plus className="size-5" />
      </Button>
    </>
  );
}
