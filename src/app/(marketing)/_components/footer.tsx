import { Copyright } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "./brand-logo";

export default function Footer() {
    return (
        <footer className="border-t border-border/60 bg-accent/10">
            <div className="container max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-5">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <BrandLogo />
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                    <Copyright size={14} />
                    <span className="text-xs">
                        Copyright {new Date().getFullYear()}
                    </span>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="#"
                        className="text-sm hover:underline underline-offset-4"
                    >
                        Terms
                    </Link>
                    <Link
                        href="#"
                        className="text-sm hover:underline underline-offset-4"
                    >
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
