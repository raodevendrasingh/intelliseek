"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/app/(marketing)/_components/brand-logo";

export default function Header() {
    return (
        <header className="sticky top-0 w-full z-100 border-b border-border">
            <div className="relative w-full container max-w-7xl mx-auto bg-background/80 supports-backdrop-filter:bg-background/70 backdrop-blur-lg">
                <div className="flex h-16 items-center justify-between px-5 lg:px-8">
                    <div className="flex items-center gap-3">
                        <BrandLogo />
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link href="/">
                            <Button>Try Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
