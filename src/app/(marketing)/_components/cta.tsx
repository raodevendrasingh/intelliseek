"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";

export default function CTA() {
    return (
        <section
            id="cta"
            className="container max-w-7xl mx-auto py-24 sm:py-32 px-5"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-accent/20 text-white rounded-3xl px-6 py-16 sm:p-16 md:p-24 shadow-2xl"
            >
                <div className="mx-auto max-w-2xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                    >
                        Take Your Research to the Next Level{" "}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6 text-lg leading-8 text-gray-300"
                    >
                        Register now and start exploring new insights. No credit
                        card required.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-emerald-600 text-base hover:bg-emerald-700 text-white px-8 rounded-full"
                            >
                                <Link href="/register">
                                    Get Started for Free
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
