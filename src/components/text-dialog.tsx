"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { LoaderButton } from "./loader-button";
import { Button } from "./ui/button";
import { textContextSchema } from "@/lib/app-schema";
import { ContextApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";

interface TextDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TextDialog({ open, onOpenChange }: TextDialogProps) {
    const [isPending, setPending] = useState<boolean>(false);
    const form = useForm<z.infer<typeof textContextSchema>>({
        resolver: zodResolver(textContextSchema),
        defaultValues: {
            content: "",
        },
    });

    const router = useRouter();
    const isContentEmpty = form.watch("content") === "";

    const onSubmit = async (queryData: z.infer<typeof textContextSchema>) => {
        setPending(true);
        try {
            const response = await fetch("/api/context/text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queryData),
            });
            const data: ContextApiResponse = await response.json();
            if (data.success) {
                router.push(`/chat/${data.chatId}`);
                onOpenChange(false);
                form.reset();
            } else {
                throw new Error("Failed to create context");
            }
        } catch (error) {
            console.error("Error adding context:", error);
            alert("Error adding context");
        } finally {
            setPending(false);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent hideCloseButton className="">
                <DialogHeader>
                    <DialogTitle>Add Text Context</DialogTitle>
                    <DialogDescription>
                        Paste or type any text you'd like to use as context.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Start here"
                                                className="resize-none w-full border-0"
                                                rows={10}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter className="flex flex-row items-center gap-2">
                    <Button
                        onClick={() => onOpenChange(false)}
                        variant="secondary"
                        className="w-1/2 rounded-full"
                    >
                        Close
                    </Button>
                    <LoaderButton
                        isLoading={isPending}
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isContentEmpty || isPending}
                        className="w-1/2 rounded-full"
                    >
                        {isPending ? "Uploading..." : "Upload Context"}
                    </LoaderButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
