import { Button } from "./ui/button";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";

export function NewChat() {
    return (
        <div className="px-2">
            <Link href="/chat">
                <Button variant="secondary" className="w-full rounded-xl">
                    <MessagesSquare />
                    New Chat
                </Button>
            </Link>
        </div>
    );
}
