'use client';

import {ReactElement} from "react";
import Search from "@/app/components/search";
import Timeline from "@/app/components/timeline";

export default function Home(): ReactElement {
    return (
        <div className="relative h-screen w-full lg:ps-64">
            <div className="py-10 lg:py-14">
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                        Welcome to ConsultApp
                    </h1>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        Your AI-powered consultant for all your migration-related queries
                    </p>
                </div>
                <Timeline/>
            </div>
            <Search/>
        </div>);
}
