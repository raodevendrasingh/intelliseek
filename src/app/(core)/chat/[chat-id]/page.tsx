"use client";

import { QueryBox } from "@/components/query-box";

export default function ChatPage({ params }: { params: { chatId: string } }) {
    return (
        <div className="w-full mx-auto min-h-screen flex">
            <div className="absolute bottom-10 flex flex-col w-full mx-auto">
                <QueryBox windowType="chat" chatId={params.chatId} />
            </div>
        </div>
    );
}
