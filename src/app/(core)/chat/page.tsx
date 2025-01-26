"use client";

import { QueryBox } from "@/components/query-box";

export default function ChatPage() {
    return (
        <div className="w-full mx-auto h-[calc(100vh-52px)] flex">
            <div className="flex flex-col w-full mx-auto pt-40">
                <div className="text-center pb-10">
                    <h1 className="text-4xl font-bold text-primary/85">
                        Chat with DropBase!
                    </h1>
                </div>
                <QueryBox windowType="home" />
            </div>
        </div>
    );
}
