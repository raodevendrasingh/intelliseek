"use client";

import { BrandLogo } from "@/app/(marketing)/_components/brand-logo";
import { QueryBox } from "@/components/query-box";

export default function ChatPage() {
    return (
        <div className="w-full mx-auto h-[calc(100vh-56px)] flex">
            <div className="flex flex-col w-full mx-auto pt-40">
                <div className="pb-16">
                    <h1 className="text-4xl font-bold text-center text-primary/90">
                        What can help you with?
                    </h1>
                </div>
                <QueryBox windowType="home" />
            </div>
        </div>
    );
}
