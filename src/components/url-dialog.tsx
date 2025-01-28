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
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderButton } from "./loader-button";
import { webLinkSchema } from "@/lib/app-schema";
import { ContextApiResponse } from "@/types/ApiResponse";
import { Textarea } from "./ui/textarea";

interface URLDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function URLDialog({ open, onOpenChange }: URLDialogProps) {
    const [isPending, setPending] = useState<boolean>(false);
    const form = useForm<z.infer<typeof webLinkSchema>>({
        resolver: zodResolver(webLinkSchema),
        defaultValues: {
            link: "",
        },
    });

    const isLinkEmpty = form.watch("link") === "";

    const onSubmit = async (link: z.infer<typeof webLinkSchema>) => {
        setPending(true);
        try {
            const response = await fetch("/api/context/link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(link),
            });
            const data = (await response.json()) as ContextApiResponse;
            console.log(data);
            if (response.ok) {
                console.log("Context added, you can close this dialog!");
                form.reset();
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Error submitting context:", error);
            alert("Error submitting context");
        } finally {
            setPending(false);
            form.reset();
        }
    };
    return (
        <Dialog open={open}>
            <DialogContent hideCloseButton className="">
                <DialogHeader>
                    <DialogTitle>Add Web Link</DialogTitle>
                    <DialogDescription>
                        Paste the url of the site you'd like to use as context.
                    </DialogDescription>
                </DialogHeader>
                <div className="mb-3">
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter a valid link"
                                                className="resize-none w-full border-0"
                                                rows={2}
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
                        disabled={isLinkEmpty || isPending}
                        className="w-1/2 rounded-full"
                    >
                        {isPending ? "Adding" : "Add Content"}
                    </LoaderButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
