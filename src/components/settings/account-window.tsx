import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const AccountWindow = () => {
    const { data: session, isPending } = authClient.useSession();

    if (!session) return null;
    const currentUser = session.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium px-2 py-2 rounded-lg">User</h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Avatar className="h-12 w-12">
                        {currentUser.image ? (
                            <AvatarImage
                                src={currentUser.image}
                                alt="@username"
                            />
                        ) : (
                            <AvatarFallback>
                                {currentUser.name
                                    ?.split(" ")
                                    .map((name) => name.charAt(0))
                                    .join("")}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{currentUser.name}</span>
                        <span className="text-accent-foreground/70">
                            {currentUser.email}
                        </span>
                    </div>
                </div>
                <Button
                    onClick={handleSignOut}
                    disabled={isPending}
                    className="bg-rose-700 hover:bg-rose-600 text-white rounded-lg"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};
