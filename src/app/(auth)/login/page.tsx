"use client";

import { Input } from "@/components/ui/input";
import { GalleryVerticalEnd } from "lucide-react";
import { GoogleAuthButton } from "../_components/GoogleAuthButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/auth-schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/loader-button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
        const { data, error } = await authClient.signIn.email(
            {
                email: formData.email,
                password: formData.password,
            },
            {
                onRequest: () => {
                    setLoading(true);
                },
                onResponse: () => {
                    setLoading(false);
                },
                onSuccess: () => {
                    form.reset();
                    toast.success("Logged in successfully");
                    router.push("/chat");
                },
                onError: (ctx) => {
                    toast.error("Error", {
                        description:
                            ctx.error.message || "An unexpected error occurred",
                    });
                    console.log(ctx.error);
                },
            },
        );
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <Link
                                href="/"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                    <GalleryVerticalEnd className="size-6" />
                                </div>
                                <span className="sr-only">Docverse</span>
                            </Link>
                            <h1 className="text-xl font-bold">Welcome Back</h1>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="/register"
                                    className="underline underline-offset-4"
                                >
                                    Register
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        {["email", "password"].map((field) => (
                                            <FormField
                                                control={form.control}
                                                key={field}
                                                name={
                                                    field as keyof z.infer<
                                                        typeof loginSchema
                                                    >
                                                }
                                                render={({
                                                    field: fieldProps,
                                                }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {field
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                field.slice(1)}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type={
                                                                    field.includes(
                                                                        "password",
                                                                    )
                                                                        ? "password"
                                                                        : field ===
                                                                            "email"
                                                                          ? "email"
                                                                          : "text"
                                                                }
                                                                placeholder=""
                                                                {...fieldProps}
                                                                autoComplete="off"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <LoaderButton
                                        isLoading={isLoading}
                                        type="submit"
                                        className="w-full"
                                    >
                                        Log in
                                    </LoaderButton>
                                </form>
                            </Form>
                        </div>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                        <div className="grid gap-4 ">
                            <GoogleAuthButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
