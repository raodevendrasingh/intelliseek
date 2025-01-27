import Header from "@/app/(marketing)/legal/_components/header";
import Footer from "@/app/(marketing)/_components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal",
};

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 p-5">{children}</div>
            <Footer />
        </main>
    );
}
