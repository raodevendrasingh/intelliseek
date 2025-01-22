"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
export default function page() {
    const { data: session, isPending, error } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <div>
            {session ? <>Signed in as {session.user.email}</> : "Not signed in"}
            <Button
                variant="destructive"
                onClick={handleSignOut}
                disabled={isPending}
            >
                Sign out
            </Button>
        </div>
    );
}
