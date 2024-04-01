import type {Metadata} from "next";
import {Inter, Merriweather} from "next/font/google";
import PrelineScript from "@/app/components/PrelineScript";
import QueryClientProviderWrapper from "@/app/lib/query-provider";

import "./globals.css";

const weather = Merriweather({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-merri-weather',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: "ConsultApp",
    description: "ConsultApp is a platform for consulting with professionals in migration fields.",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${weather.variable} ${inter.variable}`}>
        <body>
        <QueryClientProviderWrapper>
            <main>{children}</main>
        </QueryClientProviderWrapper>
        </body>
        <PrelineScript/>
        </html>
    );
}
