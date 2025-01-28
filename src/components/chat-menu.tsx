"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFetchChats } from "@/modules/fetch-chats";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function ChatMenu() {
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
                                    <SidebarMenuAction
                                        showOnHover
                                        onClick={() =>
                                            handleDeleteChat(item.id)
                                        }
                                    >
                                        <Trash2 className="text-rose-600" />
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
