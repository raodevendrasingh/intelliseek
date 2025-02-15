"use client";

import { QueryBox } from "@/components/query-box";
import { useFetchChatMessages } from "@/modules/fetch-chat-messages";
import { useFetchChats } from "@/modules/fetch-chats";
import { use, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

export const runtime = "edge";

type Params = Promise<{ slug: string }>;

export default function ChatPage(props: { params: Params }) {
    const params = use(props.params);
    const chatId = params.slug;

    const [isQueryLoading, setQueryLoading] = useState<boolean>(false);
    const { data, isLoading } = useFetchChatMessages(chatId);
    const { refetch: refetchChats } = useFetchChats();

    useEffect(() => {
        refetchChats();
    }, [chatId]);

    return (
        <div className="w-full mx-auto h-[calc(100vh-56px)] flex">
            <ScrollArea className="min-w-max max-w-2xl w-full mx-auto py-4">
                {isLoading ? (
                    <div className="h-full w-full flex justify-center items-center min-h-[calc(100vh-200px)]">
                        <Loader2
                            size={32}
                            className="animate-spin text-primary/60"
                        />
                    </div>
                ) : (
                    data &&
                    data.messageThread.map((chat, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 w-full items-start"
                        >
                            <div className="flex w-full max-w-[3/4] justify-end ">
                                <div
                                    className={clsx(
                                        "border h-fit p-2 rounded-xl ",
                                        index === 0
                                            ? "border-green-500 bg-green-300/30"
                                            : "bg-accent",
                                    )}
                                >
                                    {chat.query}
                                </div>
                            </div>
                            {isQueryLoading && (
                                <div className="flex justify-start w-20">
                                    <div className="loader" />
                                </div>
                            )}
                            {chat.response.length > 0 && (
                                <div className="flex w-full justify-start border">
                                    <div className="border h-fit p-2 rounded-lg">
                                        {chat.response}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </ScrollArea>
            <div className="absolute bottom-10 flex flex-col w-full mx-auto">
                <QueryBox
                    windowType="chat"
                    chatId={chatId}
                    isQueryLoading={isQueryLoading}
                    onLoadingChange={setQueryLoading}
                />
            </div>
        </div>
    );
}
