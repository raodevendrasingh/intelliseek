import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export const MarkdownResponse = ({ children }: { children: string }) => {
    return (
        <div className="h-fit p-2 prose lg:prose-lg max-w-full">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1
                            className="text-2xl font-bold mt-6 mb-4"
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className="text-xl font-semibold mt-5 mb-3"
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className="text-lg font-semibold mt-4 mb-2"
                            {...props}
                        />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 my-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 my-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="my-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                        <code className="bg-gray-100 p-1 rounded" {...props} />
                    ),
                    pre: ({ node, ...props }) => (
                        <pre
                            className="bg-gray-900 text-white p-4 rounded-md overflow-auto"
                            {...props}
                        />
                    ),
                    hr: ({ node, ...props }) => (
                        <hr className="border-t my-6" {...props} />
                    ),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};
