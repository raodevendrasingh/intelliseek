"use client";

import { QueryBox } from "@/components/query-box";

interface PageProps {
    params: {
        "chat-id": string;
    };
}

export default function ChatPage({ params }: PageProps) {
    return (
        <div className="w-full mx-auto min-h-screen flex">
            <div className="absolute bottom-10 flex flex-col w-full mx-auto">
                <QueryBox windowType="chat" chatId={params["chat-id"]} />
            </div>
        </div>
    );
}
