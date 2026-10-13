import { cn } from "@/lib/utils";
import { Branding } from "./Branding";
import { AppSidebar, AppSidebarTrigger } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Indicator } from "./Indicator";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import Link from "next/link";

interface Props {
  className?: string;
}
export function Header({ className }: Props) {
  const maxWidth = `max-w-[2000px]`;
  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 border-b w-full",
          "h-14 text-xl",
          className,
        )}
      >
        {/* mobile screen */}
        <div
          className={cn(
            "w-full max-h-20 py-3 px-5",
            "flex items-center justify-center gap-4",
            "md:hidden",
          )}
        >
          <SmallHeaderContent />
        </div>
        {/* md, larger screen */}
        <div
          className={cn(
            maxWidth,
            "w-full max-h-full",
            "flex items-center justify-between gap-7",
            "pt-2 px-10",
            "hidden md:flex",
            "m-auto",
          )}
        >
          <LargeHeaderContent />
        </div>
      </header>
    </>
  );
}

function SmallHeaderContent() {
  return (
    <>
      <AppSidebar />
      <AppSidebarTrigger className="size-7" />
      <Branding />
      <Indicator
        className={cn("hidden xs:flex")}
        runningCount={99}
        downCount={0}
      />
    </>
  );
}
function LargeHeaderContent() {
  return (
    <>
      <Branding />
      <Navbar />
      <Temp />
    </>
  );
}

function Temp() {
  return (
    <>
      <div className="ml-auto flex items-center gap-3.5">
        <Indicator runningCount={99} />
        <Notification count={1} />
        <Link href={"/profile"}>
          <Profile userInitial="MP" />
        </Link>
      </div>
    </>
  );
}
