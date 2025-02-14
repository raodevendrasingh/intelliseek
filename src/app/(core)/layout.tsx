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
import { usePathname } from "next/navigation";

export default function CoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const { data } = useFetchChatById(chatId);

    return (
        <section>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2 px-4">
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
                    <div className="flex flex-1">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </section>
    );
}
