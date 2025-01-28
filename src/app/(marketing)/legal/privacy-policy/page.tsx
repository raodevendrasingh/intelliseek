import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10 text-primary text-justify">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground">
                        Applicable From: February 1, 2025
                    </p>
                </div>

                {/* Introduction */}
                <section id="introduction" className="space-y-4">
                    <h2 className="text-2xl font-bold">Introduction</h2>
                    <p className="">
                        Intelliseek ("we," "us," or "our") operates the
                        Intelliseek platform (the "Platform"), an AI-powered
                        application designed to retrieve and provide insights
                        based on contextually relevant information supplied by
                        users. We are committed to protecting the privacy and
                        security of our users' personal data. This Privacy
                        Policy explains how we collect, use, and protect
                        personal data when you use our Platform..
                    </p>
                </section>

                {/* Scope */}
                <section id="scope" className="space-y-4">
                    <h2 className="text-2xl font-bold">Scope</h2>
                    <p className="">
                        This Privacy Policy applies to all users of the
                        Platform, including visitors, registered users, and
                        anyone who uploads content to the Platform.
                    </p>
                </section>

                {/* Personal Data Collection */}
                <section id="personal-data" className="space-y-4">
                    <h2 className="text-2xl font-bold">
                        What Personal Data We Collect
                    </h2>
                    <ul className="list-disc pl-8">
                        <li>
                            <strong>Name</strong>: When you create an account,
                            we collect your name.
                        </li>
                        <li>
                            <strong>Email Address</strong>: We collect your
                            email address when you create an account or contact
                            us through the Platform.
                        </li>
                        <li>
                            <strong>Uploaded Content</strong>: We store the
                            content you upload to the Platform, including text,
                            documents, images with text, and web links.
                        </li>
                    </ul>
                </section>

                {/* Use of Personal Data */}
                <section id="use-of-personal-data" className="space-y-4">
                    <h2 className="text-2xl font-bold">
                        How We Use Personal Data
                    </h2>
                    <ul className="list-disc pl-8">
                        <li>
                            <strong>Providing the Platform</strong>: We use
                            personal data to provide, maintain, and improve the
                            Platform.
                        </li>
                        <li>
                            <strong>Tailored Results</strong>: We use uploaded
                            content to provide contextually relevant results to
                            user queries.
                        </li>
                        <li>
                            <strong>Communicating with Users</strong>: We use
                            email addresses to communicate with users about
                            their accounts and Platform-related matters.
                        </li>
                    </ul>
                </section>

                {/* Data Security */}
                <section id="data-security" className="space-y-4">
                    <h2 className="text-2xl font-bold">Data Security</h2>
                    <p className="">
                        We rely on the security measures provided by our
                        database provider (Cloudflare) to protect user data. We
                        do not implement additional security measures beyond
                        this.
                    </p>
                </section>

                {/* Data Retention */}
                <section id="data-retention" className="space-y-4">
                    <h2 className="text-2xl font-bold">Data Retention</h2>
                    <p className="">
                        We retain personal data for as long as necessary to
                        provide the Platform and related services. When you
                        delete your account, all associated data is permanently
                        deleted from our systems.
                    </p>
                </section>

                {/* User Rights */}
                <section id="user-rights" className="space-y-4">
                    <h2 className="text-2xl font-bold">User Rights</h2>
                    <ul className="list-disc pl-8">
                        <li>
                            <strong>Access and Update</strong>: You can access
                            and update your personal information (name and
                            email) directly through your account settings.
                        </li>
                        <li>
                            <strong>Deletion</strong>: You can delete your
                            account at any time, which will permanently remove
                            all associated data.
                        </li>
                        <li>
                            <strong>Objection</strong>: You can object to our
                            processing of your personal data by contacting us.
                        </li>
                    </ul>
                </section>

                {/* Third-Party Services */}
                <section id="third-party-services" className="space-y-4">
                    <h2 className="text-2xl font-bold">Third-Party Services</h2>
                    <p className="">
                        We do not share user data with any third parties. All
                        uploaded content is stored securely and used solely to
                        provide the Platform's functionality.
                    </p>
                </section>

                {/* Cookies */}
                <section id="cookies" className="space-y-4">
                    <h2 className="text-2xl font-bold">Cookies</h2>
                    <p className="">
                        We use cookies only to manage user sessions when signed
                        in. No other tracking or analytics cookies are used.
                    </p>
                </section>

                {/* Compliance */}
                <section id="compliance" className="space-y-4">
                    <h2 className="text-2xl font-bold">Compliance</h2>
                    <p className="">
                        While we are not subject to specific compliance
                        requirements, we strive to adhere to industry best
                        practices for data protection.
                    </p>
                </section>

                {/* Changes to Policy */}
                <section id="changes" className="space-y-4">
                    <h2 className="text-2xl font-bold">
                        Changes to This Policy
                    </h2>
                    <p className="">
                        We may update this Privacy Policy from time to time.
                        Changes will take effect immediately upon posting on the
                        Platform. Users are encouraged to check this page
                        periodically for updates.
                    </p>
                </section>

                {/* Contact Us */}
                <section id="contact" className="space-y-4">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <p className="">
                        If you have any questions or concerns about this Privacy
                        Policy or our data protection practices, please contact
                        us at{" "}
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
    );
}
