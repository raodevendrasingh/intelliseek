"use client";

import { QueryBox } from "@/components/query-box";
import { useFetchChatMessages } from "@/modules/fetch-chat-messages";
import { useFetchChats } from "@/modules/fetch-chats";
import { use, useEffect, useState, useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

export const runtime = "edge";

type Params = Promise<{ slug: string }>;

export default function ChatPage(props: { params: Params }) {
    const params = use(props.params);
    const chatId = params.slug;

    const [isQueryLoading, setQueryLoading] = useState<boolean>(false);
    const [isUserScrolling, setIsUserScrolling] = useState<boolean>(false);
    const [aiResponse, setAiResponse] = useState<string>("");

    const viewportRef = useRef<HTMLDivElement>(null);

    const handleStreamUpdate = (chunk: string, isFinalChunk?: boolean) => {
        setAiResponse((prev) => prev + chunk);

        if (isFinalChunk) {
            setTimeout(() => setAiResponse(""), 50);
        }
    };

    const {
        data,
        isLoading,
        refetch: refetchMessages,
    } = useFetchChatMessages(chatId);
    const { refetch: refetchChats } = useFetchChats();

    useEffect(() => {
        refetchChats();
    }, [chatId]);

    useEffect(() => {
        refetchMessages();
    }, [isQueryLoading]);

    const scrollToBottom = (smooth = true) => {
        if (viewportRef.current) {
            const viewport = viewportRef.current.querySelector(
                "[data-radix-scroll-area-viewport]",
            ) as HTMLElement;
            if (viewport && !isUserScrolling) {
                requestAnimationFrame(() => {
                    viewport.scrollTo({
                        top: viewport.scrollHeight,
                        behavior: smooth ? "smooth" : "auto",
                    });
                });
            }
        }
    };

    // Detect if user manually scrolls up
    useEffect(() => {
        const viewport = viewportRef.current?.querySelector(
            "[data-radix-scroll-area-viewport]",
        ) as HTMLElement;
        if (!viewport) return;

        const handleScroll = () => {
            const isNearBottom =
                viewport.scrollHeight - viewport.scrollTop <=
                viewport.clientHeight + 50;
            setIsUserScrolling(!isNearBottom);
        };

        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (data?.messageThread?.length || isQueryLoading || aiResponse) {
            scrollToBottom(false);
        }
    }, [data, isQueryLoading, aiResponse]);

    return (
        <div className="w-full mx-auto h-[calc(100vh-56px)] flex">
            <ScrollArea
                ref={viewportRef}
                className="max-w-3xl h-[80%] w-full mx-auto px-3 pb-10"
            >
                {isLoading ? (
                    <div className="h-full w-full flex justify-center items-center min-h-[calc(100vh-200px)]">
                        <Loader2
                            size={32}
                            className="animate-spin text-primary/60"
                        />
                    </div>
                ) : (
                    data &&
                    data.messageThread.map((chat, index) => {
                        const isLastMessage =
                            index === data.messageThread.length - 1;

                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-2 w-full items-start py-2"
                            >
                                {/* User Query */}
                                <div className="flex w-full justify-end pb-2">
                                    <div
                                        className={clsx(
                                            "border h-fit p-2",
                                            index === 0 &&
                                                chat.query ===
                                                    "Context Added to Chat"
                                                ? "border w-full text-center rounded-xl bg-accent/30"
                                                : "bg-accent max-w-[60%] rounded-tl-xl rounded-tr-xl rounded-bl-xl",
                                        )}
                                    >
                                        {chat.query}
                                    </div>
                                </div>

                                {/* render streamed response */}
                                {isLastMessage && aiResponse && (
                                    <div className="flex w-full justify-start">
                                        <div className="h-fit p-2">
                                            {aiResponse}
                                        </div>
                                    </div>
                                )}

                                {/* render static response from db */}
                                {chat.response.length > 0 && (
                                    <div className="flex w-full justify-start">
                                        <div className="h-fit p-2">
                                            {chat.response}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}

                {isQueryLoading && !aiResponse && (
                    <div className="flex justify-start w-20">
                        <div className="loader" />
                    </div>
                )}

                <ScrollBar className="hidden" />
            </ScrollArea>

            <div className="absolute bottom-10 flex flex-col w-full mx-auto">
                <QueryBox
                    windowType="chat"
                    chatId={chatId}
                    isQueryLoading={isQueryLoading}
                    onStreamUpdate={handleStreamUpdate}
                    onLoadingChange={(loading) => {
                        setQueryLoading(loading);
                        if (!loading) setAiResponse(""); // Ensure state resets after query ends
                    }}
                />
            </div>
        </div>
    );
}
