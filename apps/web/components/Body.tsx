import { cn } from "@/lib/utils";

export function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn("py-20 mx-auto w-full grow", "px-5 md:px-10", className)}
      >
        {children}
      </div>
    </>
  );
}
