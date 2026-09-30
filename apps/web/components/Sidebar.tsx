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
import { Menu, ListChecks } from "lucide-react";
import { Branding } from "./Branding";
import { Profile } from "./Profile";
import * as React from "react";
import Link from "next/link";
import { AddMonitorCta } from "./Cta";
import { cn } from "@/lib/utils";

const SIDEBAR_LINKS = [
  // { href: "/", label: "Home", icon: ListChecks },
  { href: "/monitors", label: "Monitors", icon: ListChecks },
] as const;

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AppSidebar({ className }: Pick<Props, "className">) {
  return (
    <Sidebar className={cn("", className)}>
      <SidebarHeader>
        <Branding />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SIDEBAR_LINKS.map(({ label, icon: Icon, href }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton render={<Link href={href} />}>
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <AddMonitorCta />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-1">
        <Button
          variant="ghost"
          className="border-t flex gap-2 justify-start cursor-pointer"
        >
          <Profile userInitial="Mp" />
          <span>Profile</span>
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
