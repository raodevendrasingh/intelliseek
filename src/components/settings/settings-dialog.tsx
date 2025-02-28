import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, PaintBucket, Settings, User, Globe } from "lucide-react";
import { SessionWindow } from "@/components/settings/session-window";
import { AccountWindow } from "@/components/settings/account-window";
import { AppearanceWindow } from "@/components/settings/appearance-window";
import { DataWindow } from "@/components/settings/data-window";

export default function SettingsDialog() {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <div className="py-2 w-full flex items-center gap-2 rounded-lg px-3 hover:bg-accent transition-colors">
                    <Settings className="mr-3 size-4" />
                    <span className="text-sm">Settings</span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full p-0">
                <div className="p-6 bg-accent/30 rounded-3xl">
                    <DialogHeader className="pb-5">
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription className="sr-only">
                            Customize your settings here.
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs
                        defaultValue="account"
                        className="flex gap-5 h-[400px] w-full"
                    >
                        <TabsList className="flex flex-col gap-2 bg-transparent h-44">
                            <TabsTrigger
                                className="flex justify-start gap-3 w-36 rounded-lg"
                                value="account"
                            >
                                <User size={18} />
                                Account
                            </TabsTrigger>
                            <TabsTrigger
                                className="flex justify-start gap-3 w-36 rounded-lg"
                                value="session"
                            >
                                <Globe size={18} />
                                Sessions
                            </TabsTrigger>
                            <TabsTrigger
                                className="flex justify-start gap-3 w-36 rounded-lg"
                                value="appearance"
                            >
                                <PaintBucket size={18} />
                                Appearance
                            </TabsTrigger>
                            <TabsTrigger
                                className="flex justify-start gap-3 w-36 rounded-lg"
                                value="data"
                            >
                                <Database size={18} />
                                Data
                            </TabsTrigger>
                        </TabsList>
                        <div className="w-full">
                            <TabsContent value="account">
                                <AccountWindow />
                            </TabsContent>
                            <TabsContent value="session">
                                <SessionWindow />
                            </TabsContent>
                            <TabsContent value="appearance">
                                <AppearanceWindow />
                            </TabsContent>
                            <TabsContent value="data">
                                <DataWindow />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}
