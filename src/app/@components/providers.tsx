"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FC, PropsWithChildren, Suspense } from "react";

const queryClient = new QueryClient();

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Providers;
