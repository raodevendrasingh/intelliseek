"use client";

import { QueryBox } from "@/components/query-box";

export default function ChatPage() {
    return (
        <div className="w-full mx-auto min-h-screen flex">
            <div className="flex flex-col w-full mx-auto pt-52">
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
