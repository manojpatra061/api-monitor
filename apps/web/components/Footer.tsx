import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  const maxWidth = `max-w-[2000px]`;
  return (
    <>
      <footer className={cn("border-t", className)}>
        <div className={cn(maxWidth, "w-full mx-auto px-5 md:px-10")}>
          <p className="text-base font-thin italic text-center lg:text-right">
            Developed by <span className="underline">Manoj Patra</span>
          </p>
        </div>
      </footer>
    </>
  );
}
