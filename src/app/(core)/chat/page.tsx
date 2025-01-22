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
import { Paperclip, ArrowRight, SpinnerBall } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof querySchema>>({
        resolver: zodResolver(querySchema),
        defaultValues: {
            query: "",
        },
    });

    const onSubmit = async (queryData: z.infer<typeof querySchema>) => {
        setLoading(true);
        console.log(queryData);
        try {
        } catch (error) {
            console.log(error);
            alert("Error submitting query");
        }
        setLoading(false);
    };
    return (
        <div className="w-full mx-auto min-h-screen flex justify-center items-center px-5">
            <div className="flex flex-col justify-center items-center w-full mx-auto">
                <div className="text-center pb-10">
                    <h1 className="text-3xl font-bold">
                        What can I help you with?
                    </h1>
                </div>
                <Card className="min-w-max max-w-2xl w-full p-2 space-y-2 bg-accent">
                    <CardContent className="w-full p-0">
                        <Form {...form}>
                            <form>
                                <FormField
                                    control={form.control}
                                    name="query"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add a resource and start chatting..."
                                                    className="resize-none w-full border-0"
                                                    rows={3}
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
                        <div className="flex justify-between items-center w-full">
                            <Button
                                variant="outline"
                                className="rounded-full h-8"
                            >
                                <Paperclip size={32} />
                                <span>Context</span>
                            </Button>
                            <Button
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={form.handleSubmit(onSubmit)}
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
        </div>
    );
}
