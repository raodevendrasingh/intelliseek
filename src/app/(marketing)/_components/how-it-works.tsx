"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Upload, Brain, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

const steps = [
    {
        title: "Add Context to Your Research",
        description:
            "Upload relevant texts, documents, images, or web links to get started.",
        icon: <Upload className="w-8 h-8 text-teal-400" />,
    },
    {
        title: "Advanced AI Analysis",
        description:
            "Our platform analyzes your uploaded context to prepare for your research questions.",
        icon: <Brain className="w-8 h-8 text-indigo-400" />,
    },
    {
        title: "Get Relevant Answers",
        description:
            "Ask questions and get accurate and relevant responses based on your research context.",
        icon: <MessageSquare className="w-8 h-8 text-red-400" />,
    },
];

export default function HowItWorks() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section
            id="how-it-works"
            className="container max-w-7xl mx-auto py-24 sm:py-32"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-20"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground"
                >
                    How It Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
                >
                    Discover how our intuitive platform and AI technology work
                    together to streamline your research workflow{" "}
                </motion.p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border-none">
                            <CardHeader className="text-center pb-2">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10,
                                        delay: 0.2 + index * 0.1,
                                    }}
                                    className="flex justify-center"
                                >
                                    <div className="rounded-full bg-accent p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                                        {step.icon}
                                    </div>
                                </motion.div>
                                <CardTitle className="text-xl font-bold mb-2 text-card-foreground">
                                    {step.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-muted-foreground text-base">
                                    {step.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
