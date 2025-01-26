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
import { Trash2 } from "lucide-react";

interface Items {
    title: string;
    url: string;
    isActive?: boolean;
}
[];
// This is sample data.
const data: Items[] = [
    {
        title: "Getting Started",
        url: "/chat/ksdbkjbskjdfjksdgfjksgdjk",
    },
    {
        title: "Building Your Application",
        url: "/chat/sklnvlkjbljblkjdvjkasdnvbs",
    },
    {
        title: "API Reference",
        url: "/chat/sadkjbkjsbkdvjbskdjvbksjdbv",
    },
    {
        title: "Architecture",
        url: "/chat/sdhvhjsdbvkjasbkjdvbjkasbdvkj",
    },
];

export function ChatMenu() {
    const handleDeleteChat = () => {
        console.log("chat deleted");
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarMenu>
                {data.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction
                                    showOnHover
                                    onClick={handleDeleteChat}
                                >
                                    <Trash2 className="text-rose-600" />
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
