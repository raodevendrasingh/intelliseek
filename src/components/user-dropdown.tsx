"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SettingsDialog from "@/components/settings/settings-dialog";

export const UserMenuDropdown = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const currentUser = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <div className="absolute right-8">
            {currentUser && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-10 w-10 p-0 rounded-full"
                        >
                            <Avatar>
                                <AvatarImage src="" alt="@username" />
                                <AvatarFallback>
                                    {currentUser.name
                                        ?.split(" ")
                                        .map((name) => name.charAt(0))
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-52 p-0 rounded-2xl"
                        align="end"
                    >
                        <div className="p-2 bg-accent/30 rounded-2xl">
                            <div className="flex items-center justify-start gap-3 p-3 border-b border-border cursor-default">
                                <div className="flex text-sm flex-col truncate">
                                    <p className="font-medium">
                                        {currentUser.name}
                                    </p>
                                </div>
                            </div>

                            <div className="py-2 w-full">
                                <SettingsDialog />
                            </div>
                            <hr className="border-border" />
                            <div className="pt-2">
                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    className="flex justify-start rounded-lg w-full hover:text-rose-500 px-3"
                                >
                                    <LogOut className="mr-3 size-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
};
