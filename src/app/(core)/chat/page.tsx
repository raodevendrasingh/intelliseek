"use client";

import { QueryBox } from "@/components/query-box";
import { useState } from "react";

export default function ChatPage() {
    const [isQueryLoading, setQueryLoading] = useState<boolean>(false);

    return (
        <div className="w-full mx-auto h-[calc(100vh-56px)] flex">
            <div className="flex flex-col w-full mx-auto pt-40">
                <div className="pb-16">
                    <h1 className="text-4xl font-bold text-center text-primary/90">
                        What can I help with?
                    </h1>
                </div>
                <QueryBox windowType="home" onLoadingChange={setQueryLoading} />
            </div>
        </div>
    );
}
