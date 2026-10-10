import { QueryClient_Provider } from "@/lib/query-client/QueryClientProvider";
import { AppSidebarProvider } from "./Sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClient_Provider>
        <AppSidebarProvider>{children}</AppSidebarProvider>
      </QueryClient_Provider>
    </>
  );
}
