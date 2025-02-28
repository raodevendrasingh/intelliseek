"use client";

import { querySchema } from "@/lib/app-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, SpinnerBall } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import TextDialog from "@/components/text-dialog";
import PopoverItems from "@/components/popover-items";
import clsx from "clsx";
import { GenerateUUID } from "@/utils/generate-uuid";
import UploadDialog from "./upload-dialog";
import URLDialog from "./url-dialog";

type DialogType = "text" | "file" | "link" | null;

type QueryBoxProps = {
    windowType: "chat" | "home";
    chatId?: string;
    isQueryLoading?: boolean;
    onLoadingChange?: (isLoading: boolean) => void;
    onStreamUpdate?: (chunk: string) => void;
};

export const QueryBox = ({
    windowType,
    chatId: propChatId,
    isQueryLoading,
    onLoadingChange = () => {},
    onStreamUpdate = () => {},
}: QueryBoxProps) => {
    const [activeDialog, setActiveDialog] = useState<DialogType>(null);

    const router = useRouter();
    const form = useForm<z.infer<typeof querySchema>>({
        resolver: zodResolver(querySchema),
        defaultValues: {
            content: "",
            chatId: propChatId,
        },
    });

    const isQueryEmpty = form.watch("content") === "";

    const placeholderMsg: string =
        windowType === "home"
            ? "Upload a context and start a conversation..."
            : "Ask Intelliseek...";

    const totalRows: number = windowType === "home" ? 0 : 2;

    const onSubmit = async (queryData: z.infer<typeof querySchema>) => {
        onLoadingChange(true);
        form.reset();
        console.log(queryData);
        try {
            let currentChatId = queryData.chatId;

            // query api '/api/query' for chats without context
            if (!currentChatId) {
                console.log("workflow 2 triggered");
                currentChatId = GenerateUUID();
                const newQueryBody = { ...queryData, chatId: currentChatId };

                const queryResponse = await fetch(`/api/query`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newQueryBody),
                });

                if (!queryResponse.ok) {
                    throw new Error("Failed to create chat or process query");
                }

                router.push(`/chat/${currentChatId}`);
                return;
            }

            // chat api '/api/chat' for chats with context
            if (currentChatId) {
                console.log("workflow 1 triggered");

                const chatResponse = await fetch(`/api/chat`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...queryData,
                        chatId: currentChatId,
                    }),
                });

                if (!chatResponse.ok) {
                    throw new Error("Failed to process query");
                }

                const reader = chatResponse.body?.getReader();
                const decoder = new TextDecoder();

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, { stream: true });

                        onStreamUpdate(chunk);
                    }
                }
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting query");
        } finally {
            onLoadingChange(false);
        }
    };

    return (
        <>
            <div className="w-full mx-auto px-3">
                <Card
                    className={clsx(
                        "min-w-max max-w-3xl w-full mx-auto p-3 space-y-3 bg-accent rounded-3xl",
                    )}
                >
                    <CardContent className="w-full p-0">
                        <Form {...form}>
                            <form>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={placeholderMsg}
                                                    className="resize-none w-full h-full border-0"
                                                    rows={totalRows}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === "Enter" &&
                                                            !e.shiftKey &&
                                                            !isQueryEmpty
                                                        ) {
                                                            e.preventDefault();
                                                            form.handleSubmit(
                                                                onSubmit,
                                                            )();
                                                        }
                                                    }}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="p-0">
                        <div
                            className={clsx(
                                "flex  w-full",
                                windowType === "home"
                                    ? "justify-between items-center"
                                    : "justify-end",
                            )}
                        >
                            {windowType === "home" && (
                                <PopoverItems
                                    setActiveDialog={setActiveDialog}
                                />
                            )}

                            <Button
                                size="icon"
                                className="h-8 w-8 rounded-full cursor-pointer"
                                onClick={form.handleSubmit(onSubmit)}
                                disabled={isQueryEmpty}
                            >
                                {isQueryLoading ? (
                                    <SpinnerBall
                                        size={32}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <ArrowRight size={32} />
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <TextDialog
                open={activeDialog === "text"}
                onOpenChange={() => setActiveDialog(null)}
            />

            <UploadDialog
                open={activeDialog === "file"}
                onOpenChange={() => setActiveDialog(null)}
            />

            <URLDialog
                open={activeDialog === "link"}
                onOpenChange={() => setActiveDialog(null)}
            />
        </>
    );
};
