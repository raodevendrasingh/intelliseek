import wordmarkLogo from "@/assets/brand/intelliseek-workmark.png";
import Image from "next/image";
import Link from "next/link";

export const BrandLogo = () => {
    return (
        <div className="self-center">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src={wordmarkLogo}
                    alt="brand-icon"
                    height={80}
                    width={180}
                />
            </Link>
        </div>
    );
};
