import Header from "@/app/(marketing)/_components/header";
import Hero from "@/app/(marketing)//_components/hero";
import Features from "@/app/(marketing)//_components/features";
import HowItWorks from "@/app/(marketing)//_components/how-it-works";
import CTA from "@/app/(marketing)//_components/cta";
import Footer from "@/app/(marketing)//_components/footer";

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-background font-sans mx-auto antialiased">
            <Header />
            <main>
                <Hero />
                <HowItWorks />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
