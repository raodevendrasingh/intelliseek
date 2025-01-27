"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <header className="fixed left-1/2 -translate-x-1/2 top-2 z-50 w-full max-w-7xl mx-auto px-2">
            <div className="container mx-auto border border-border bg-background/5 rounded-xl backdrop-blur-xl">
                <div className=" flex h-16 items-center justify-between rounded-xl px-5">
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
                        <Link href="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button>Get Started</Button>
                        </Link>
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
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-2"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link href="/login">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </motion.div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
