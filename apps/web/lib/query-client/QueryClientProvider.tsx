"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./init";
import React from "react";

export function QueryClient_Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
