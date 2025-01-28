"use client";

import { QueryBox } from "@/components/query-box";
import { useFetchChatById } from "@/modules/fetch-chat-by-id";
import { use } from "react";

export const runtime = "edge";

type Params = Promise<{ slug: string }>;

export default function ChatPage(props: { params: Params }) {
    const params = use(props.params);
    const chatId = params.slug;

    const { data, isLoading, isError, error } = useFetchChatById(chatId);

    return (
        <div className="w-full mx-auto h-[calc(100vh-56px)] flex">
            <div className="absolute bottom-10 flex flex-col w-full mx-auto">
                <QueryBox windowType="chat" chatId={chatId} />
            </div>
        </div>
    );
}
