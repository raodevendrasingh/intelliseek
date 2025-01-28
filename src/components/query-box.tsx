"use client";

import { querySchema } from "@/lib/app-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
};

export const QueryBox = ({ windowType, chatId: propChatId }: QueryBoxProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [activeDialog, setActiveDialog] = useState<DialogType>(null);

    const [chatId, setChatId] = useState<string | null>(propChatId || null);

    useEffect(() => {
        if (windowType === "home" && !chatId) {
            const newChatId = GenerateUUID();
            setChatId(newChatId);
        }
    }, [windowType, chatId]);

    const router = useRouter();
    const form = useForm<z.infer<typeof querySchema>>({
        resolver: zodResolver(querySchema),
        defaultValues: {
            content: "",
        },
    });

    const isQueryEmpty = form.watch("content") === "";

    const placeholderMsg: string =
        windowType === "home"
            ? "Upload a context and start a conversation..."
            : "Ask Intelliseek...";

    const totalRows: number = windowType === "home" ? 0 : 2;

    const onSubmit = async (queryData: z.infer<typeof querySchema>) => {
        setLoading(true);
        localStorage.setItem("isLoading", "true");
        console.log(queryData);
        try {
            const queryBody = { ...queryData, chatId };
            if (!chatId) {
                throw new Error("Chat ID is missing");
            }

            if (windowType === "home") {
                router.push(`/chat/${chatId}`);
            }

            await new Promise((resolve) => setTimeout(resolve, 10000));

            const response = await fetch(`/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queryBody),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            alert("Error submitting query");
        } finally {
            setLoading(false);
            localStorage.removeItem("isLoading");
            console.log("finally called");
        }
    };

    // Check for persisted loading state on component mount
    useEffect(() => {
        const isLoading = localStorage.getItem("isLoading") === "true";
        if (isLoading) {
            setLoading(true);
        }
    }, []);
    return (
        <>
            <div className="w-full mx-auto px-3">
                <Card
                    className={clsx(
                        "min-w-max max-w-2xl w-full mx-auto p-3 space-y-3 bg-accent rounded-3xl",
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
                                {isLoading ? (
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
