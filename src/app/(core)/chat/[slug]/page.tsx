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
    const [animatedResponse, setAnimatedResponse] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [hasInitialLoad, setHasInitialLoad] = useState(false);

    // Track the last displayed response
    const lastDisplayedResponse = useRef<string>("");

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

    useEffect(() => {
        // Auto-scroll when new messages arrive
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [data, animatedResponse]);

    // Function to animate the response word-by-word
    const animateResponse = (response: string) => {
        setAnimatedResponse("");
        let words = response.split(" ");
        let index = 0;

        const interval = setInterval(() => {
            if (index < words.length) {
                setAnimatedResponse(
                    (prev) => prev + (prev ? " " : "") + words[index],
                );
                index++;
            } else {
                clearInterval(interval);
                // Update the last displayed response
                lastDisplayedResponse.current = response;
            }
        }, 50); // Adjust speed of word-by-word animation
    };

    useEffect(() => {
        if (data && data.messageThread.length > 0) {
            const lastMessage =
                data.messageThread[data.messageThread.length - 1];
            if (lastMessage.response) {
                if (!hasInitialLoad) {
                    // On first load, set response immediately
                    setAnimatedResponse(lastMessage.response);
                    setHasInitialLoad(true);
                    // Update the last displayed response
                    lastDisplayedResponse.current = lastMessage.response;
                } else if (
                    lastMessage.response !== lastDisplayedResponse.current
                ) {
                    // Only animate for new responses
                    animateResponse(lastMessage.response);
                }
            }
        }
    }, [data, hasInitialLoad]);

    useEffect(() => {
        const scrollToBottom = () => {
            if (viewportRef.current) {
                const viewport = viewportRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]",
                );
                if (viewport) {
                    viewport.scrollTop = viewport.scrollHeight;
                }
            }
        };

        if (data?.messageThread?.length || isQueryLoading || animatedResponse) {
            scrollToBottom();
        }
    }, [data, isQueryLoading, animatedResponse]);

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
                    data.messageThread.map((chat, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 w-full items-start py-2"
                        >
                            <div className="flex w-full justify-end pb-2">
                                <div
                                    className={clsx(
                                        "border h-fit p-2 rounded-xl",
                                        index === 0
                                            ? "border w-full text-center bg-accent/30"
                                            : "bg-accent max-w-[60%]",
                                    )}
                                >
                                    {chat.query}
                                </div>
                            </div>

                            {chat.response.length > 0 && (
                                <div className="flex w-full justify-start">
                                    <div className="h-fit p-2 rounded-lg">
                                        {index === data.messageThread.length - 1
                                            ? animatedResponse // Show animated response for the latest message
                                            : chat.response}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
                {isQueryLoading && (
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
                    onLoadingChange={setQueryLoading}
                />
            </div>
        </div>
    );
}
