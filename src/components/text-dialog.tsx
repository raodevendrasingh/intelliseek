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

    const isQueryEmpty = form.watch("content") === "";

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
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log("Context uploaded, you can close this dialog!");
                form.reset();
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Error submitting context:", error);
            alert("Error submitting context");
        }

        setPending(false);
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
                                                placeholder=""
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
                <DialogFooter>
                    <Button
                        onClick={() => onOpenChange(false)}
                        variant="secondary"
                        className="w-36"
                    >
                        Close
                    </Button>
                    <LoaderButton
                        isLoading={isPending}
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isQueryEmpty || isPending}
                        className="w-36"
                    >
                        {isPending ? "Uploading" : "Upload Context"}
                    </LoaderButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
