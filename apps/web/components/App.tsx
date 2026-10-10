import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={cn("flex flex-col", "mx-auto, text-brand-text")}>
        <Header className="bg-brand-secondary" />
        <Body
          className={cn("max-w-[2000px] border-l border-r", "bg-brand-primary")}
        >
          <main>{children}</main>
        </Body>
        <Footer className="bg-brand-secondary w-screen" />
      </div>
    </>
  );
}
