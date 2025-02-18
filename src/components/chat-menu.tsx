"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useFetchChats } from "@/modules/fetch-chats";
import {
    Archive,
    Loader2,
    MoreVertical,
    TextCursorInput,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function ChatMenu() {
    const { isMobile } = useSidebar();

    const { data, isLoading, isError, error } = useFetchChats();

    if ((!data || isError) && !isLoading) {
        console.log("error fetching data", error);
        toast.error("Failed to fetch chats");
    }

    const handleDeleteChat = (id: string) => {
        return console.log("chat deleted with id: ", id);
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarMenu>
                {isLoading ? (
                    <span className="self-center">
                        <Loader2 size={16} className="animate-spin" />
                    </span>
                ) : (
                    data &&
                    data.chats.map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton asChild>
                                <Link href={`/chat/${item.id}`}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreVertical />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-40 p-0 rounded-2xl"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <div className="bg-accent/30 p-2 group">
                                        <DropdownMenuItem>
                                            <TextCursorInput className="text-muted-foreground" />
                                            <span>Rename</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Archive className="text-muted-foreground" />
                                            <span>Archive</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-2" />
                                        <DropdownMenuItem
                                            className="group/item"
                                            onClick={() =>
                                                handleDeleteChat(item.id)
                                            }
                                        >
                                            <Trash2 className="text-muted-foreground group-hover/item:text-rose-500" />
                                            <span className="group-hover/item:text-rose-500">
                                                Delete
                                            </span>
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
