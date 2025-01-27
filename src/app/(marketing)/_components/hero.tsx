"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Search, Database, Brain } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white pt-20">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-20 left-20 animate-bounce"
                >
                    <Search className="w-8 h-8 text-blue-400" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="absolute bottom-32 right-24 animate-pulse"
                >
                    <Database className="w-6 h-6 text-purple-400" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="absolute top-40 right-32 animate-bounce"
                >
                    <Brain className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="absolute bottom-40 left-32 animate-pulse"
                >
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Accent Circles */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, type: "spring" }}
                        className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-2000"
                    />

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="block text-white"
                            >
                                Your Context,
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="block text-emerald-400"
                            >
                                Your Answers
                            </motion.span>
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Transform the way you search. Intelligent, precise, and
                        tailored to your needs.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex flex-wrap justify-center gap-6 pt-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white w-44 px-8 py-6 text-lg rounded-full transition-all duration-200"
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-transparent border-2 border-white text-white w-44 px-8 py-6 text-lg rounded-full hover:bg-white hover:text-black transition-all duration-200"
                            >
                                <Link href="#how-it-works">Discover More</Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Feature Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="flex flex-wrap justify-center gap-4 pt-12"
                    >
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm"
                        >
                            AI-Powered Search
                        </motion.span>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-orange-900/30 rounded-full text-orange-300 text-sm"
                        >
                            Multi-Format Support
                        </motion.span>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-emerald-900/30 rounded-full text-emerald-300 text-sm"
                        >
                            Real-time Analysis
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
