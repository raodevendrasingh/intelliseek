"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileType, Image, Link2 } from "lucide-react";
import { motion } from "motion/react";

const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="rounded-full bg-accent p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-lg"
    >
        {children}
    </motion.div>
);

const features = [
    {
        title: "Raw Text",
        description:
            "Upload plain text files or paste content directly for instant analysis.",
        icon: <FileText className="w-8 h-8 text-blue-400" />,
    },
    {
        title: "PDF Documents",
        description:
            "Extract and analyze information from PDF files with ease.",
        icon: <FileType className="w-8 h-8 text-rose-400" />,
    },
    {
        title: "Images",
        description:
            "Process images containing text using advanced OCR technology.",
        icon: <Image className="w-8 h-8 text-emerald-400" />,
    },
    {
        title: "Web Links",
        description:
            "Fetch and analyze content from web pages with a single click.",
        icon: <Link2 className="w-8 h-8 text-orange-400" />,
    },
];

export default function Features() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
            id="features"
            className="container max-w-7xl py-24 sm:py-32 mx-auto"
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
                    Supported Resources
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
                >
                    Seamlessly integrate and analyze content from multiple
                    sources, unlocking valuable insights from your data.
                </motion.p>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="h-full rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                            <CardHeader className="text-center">
                                <div className="flex justify-center">
                                    <FeatureIcon>{feature.icon}</FeatureIcon>
                                </div>
                                <CardTitle className="text-xl font-bold mb-2 text-card-foreground">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-center">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
