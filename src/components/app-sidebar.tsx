"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { ChatMenu } from "@/components/chat-menu";
import { NewChat } from "@/components/new-chat";
import { PanelRightOpen, Search, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { toggleSidebar } = useSidebar();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center justify-between w-full">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={(event) => {
                                    toggleSidebar();
                                }}
                            >
                                <PanelRightOpen />
                            </Button>
                            <span className="flex items-center gap-5">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7"
                                >
                                    <Search />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7"
                                >
                                    <SquarePen />
                                </Button>
                            </span>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NewChat />
                <ChatMenu />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
