"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, MoveRight, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { motion, AnimatePresence } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const { data: session } = authClient.useSession();

    return (
        <header className="fixed left-1/2 -translate-x-1/2 top-2 z-50 w-full max-w-7xl mx-auto px-2">
            <div className="container mx-auto border border-border bg-background/50 rounded-2xl backdrop-blur-xl">
                <div className=" flex h-16 items-center justify-between px-5">
                    <div className="flex items-center space-x-4">
                        <BrandLogo />
                    </div>
                    <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
                        <Link
                            href="#how-it-works"
                            className="transition-colors hover:text-emerald-500"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#features"
                            className="transition-colors hover:text-emerald-500"
                        >
                            Features
                        </Link>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        {session ? (
                            <Link href="/chat">
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Open App
                                    <MoveRight />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        className="rounded-full"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="rounded-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <nav className="flex flex-col space-y-4 p-4">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <Link
                                        href="#how-it-works"
                                        className="transition-colors hover:text-emerald-500"
                                    >
                                        How It Works
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link
                                        href="#features"
                                        className="transition-colors hover:text-emerald-500"
                                    >
                                        Features
                                    </Link>
                                </motion.div>
                                <Separator />
                                <motion.div
                                    className="w-full"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {session ? (
                                        <Link href="/chat" className="w-full">
                                            <Button
                                                variant="outline"
                                                className="rounded-full w-full"
                                            >
                                                Open App
                                                <MoveRight />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                                            <Link
                                                href="/login"
                                                className="w-full"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="w-full rounded-full"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="w-full"
                                            >
                                                <Button className="w-full rounded-full">
                                                    Get Started
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
