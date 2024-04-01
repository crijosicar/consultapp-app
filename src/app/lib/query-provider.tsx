'use client';

import {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function QueryClientProviderWrapper({children}: { children: React.ReactNode }) {
    const clientOpts = {
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 6 * 1000,
                refetchInterval: 6 * 1000,
            },
        },
    }

    const [queryClient] = useState(() => new QueryClient(clientOpts));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
