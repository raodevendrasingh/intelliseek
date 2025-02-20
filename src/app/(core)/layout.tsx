"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMenuDropdown } from "@/components/user-dropdown";
import { useFetchChatById } from "@/modules/fetch-chat-by-id";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const { data, isFetched, isError } = useFetchChatById(chatId);

    useEffect(() => {
        if (chatId && isFetched && (!data || isError)) {
            router.replace("/chat");
            toast.error("Error Loading Conversation", {
                description: "No such conversation exists",
            });
        }
    }, [data, isFetched, isError, chatId, router]);

    return (
        <section>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2 px-4 bg-accent/30">
                        <SidebarTrigger className="-ml-1" />

                        {data && (
                            <>
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 h-4"
                                />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            {data.currentChat.title}
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </>
                        )}
                        <UserMenuDropdown />
                    </header>
                    <div className="flex flex-1 bg-accent/30">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </section>
    );
}
