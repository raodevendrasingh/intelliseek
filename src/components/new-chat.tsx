import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";

export function NewChat() {
    return (
        <div className="px-2">
            <Link href="/chat">
                <Button
                    variant="ghost"
                    className=" flex justify-start px-2 h-10 w-full rounded-lg md:text-base hover:bg-accent/70"
                >
                    <span className="border-2 border-accent-foreground/10 rounded-full p-1.5 bg-accent/80">
                        <MessagesSquare size={18} />
                    </span>
                    <span className="">Intelliseek</span>
                </Button>
            </Link>
        </div>
    );
}
