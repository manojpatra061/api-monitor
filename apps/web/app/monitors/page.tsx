import { buttonVariants } from "@/components/ui/button";
import { MonitorsTable } from "./MonitorsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MonitorsPage() {
  return (
    <>
      <HeadSection />
      <MonitorsTable />
    </>
  );
}

function HeadSection() {
  return (
    <section className="mb-10 flex flex-col gap-4 justify-between md:flex-row">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Monitors</h1>
        <p className="text-sm">
          Track the health and performance of your endpoints.
        </p>
      </div>
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "lg",
            className: "rounded md:rounded-full",
          }),
        )}
      >
        <Plus />
        <span className=" md:hidden uppercase font-semibold text-sm">
          Add Monitor
        </span>
      </Link>
    </section>
  );
}
