import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms Of Service",
};

export default function TermsOfService() {
    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10 text-primary text-justify">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Terms Of Service
                    </h1>
                    <p className="text-muted-foreground">
                        Applicable From: February 1, 2025
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Acceptance of Terms */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            1. Acceptance of Terms
                        </h2>
                        <p className="">
                            By accessing or using Intelliseek ("we," "our," or
                            "us"), you ("user," "you") agree to be bound by
                            these Terms of Service ("Terms"). If you do not
                            agree with any part of these Terms, you may not use
                            our platform.
                        </p>
                    </section>

                    {/* Eligibility */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. Eligibility</h2>
                        <p className="">
                            You must be at least 16 years old to use
                            Intelliseek. By using our platform, you confirm that
                            you meet this age requirement.
                        </p>
                    </section>

                    {/* User Accounts */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. User Accounts</h2>
                        <p className="">
                            To access certain features, you may need to create
                            an account. You agree to provide accurate and
                            up-to-date information during registration,
                            including your name and email address. You are
                            responsible for maintaining the confidentiality of
                            your account credentials.
                        </p>
                    </section>

                    {/* Data Collection and Use */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            4. Data Collection and Use
                        </h2>
                        <p className="">
                            Intelliseek collects and stores the following data:
                        </p>
                        <ul className="list-disc pl-8">
                            <li>Your name and email address.</li>
                            <li>The content you upload to our platform.</li>
                        </ul>
                        <p className="">
                            For more information, please review our{" "}
                            <Link
                                href="/legal/privacy-policy"
                                className="text-emerald-500 underline"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </section>

                    {/* Limited Free Model */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            5. Limited Free Model
                        </h2>
                        <p className="">
                            Intelliseek operates on a limited free model.
                            Certain features may only be accessible through paid
                            plans, which we may introduce in the future. Details
                            about pricing and features will be communicated
                            prior to implementation.
                        </p>
                    </section>

                    {/* Prohibited Activities */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            6. Prohibited Activities
                        </h2>
                        <p className="">
                            When using Intelliseek, you agree not to:
                        </p>
                        <ul className="list-disc pl-8">
                            <li>
                                Upload illegal, harmful, or offensive content.
                            </li>
                            <li>Use the platform for unauthorized purposes.</li>
                            <li>
                                Engage in activities that may disrupt or harm
                                our services or infrastructure.
                            </li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            7. Intellectual Property
                        </h2>
                        <p className="">
                            All intellectual property related to Intelliseek,
                            including trademarks, logos, and software, remains
                            our exclusive property. Users retain ownership of
                            the content they upload but grant us a non-exclusive
                            license to store and process this data for providing
                            services.
                        </p>
                    </section>

                    {/* Termination */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">8. Termination</h2>
                        <p className="">
                            We reserve the right to suspend or terminate your
                            account at any time for violations of these Terms or
                            any applicable laws.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            9. Limitation of Liability
                        </h2>
                        <p className="">
                            To the maximum extent permitted by law, Intelliseek
                            shall not be held liable for any indirect,
                            incidental, or consequential damages arising from
                            your use of the platform.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            10. Governing Law
                        </h2>
                        <p className="">
                            These Terms shall be governed by and construed in
                            accordance with the laws of India.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            11. Changes to Terms
                        </h2>
                        <p className="">
                            We may update these Terms from time to time. The
                            updated version will be posted on this page with a
                            new "Last updated" date. Continued use of the
                            platform after such changes constitutes your
                            acceptance of the new Terms.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">12. Contact Us</h2>
                        <p className="">
                            If you have any questions about these Terms, please
                            contact us at{" "}
                            <Link
                                href="mailto:devthedeveloperguy@gmail.com"
                                className="text-emerald-500 underline"
                            >
                                devthedeveloperguy@gmail.com
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
