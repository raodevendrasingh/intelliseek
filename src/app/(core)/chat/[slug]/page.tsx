"use client";

import { QueryBox } from "@/components/query-box";
import { use } from "react";

export const runtime = "edge";

type Params = Promise<{ slug: string }>;

export default function ChatPage(props: { params: Params }) {
    const params = use(props.params);
    const slug = params.slug;

    return (
        <div className="w-full mx-auto min-h-screen flex">
            <div className="absolute bottom-10 flex flex-col w-full mx-auto">
                <QueryBox windowType="chat" chatId={slug} />
            </div>
        </div>
    );
}
