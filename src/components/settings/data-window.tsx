import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DataWindow = () => {
    const router = useRouter();

    const handleDataExport = async () => {
        console.log("handleDataExport");
        try {
            const res = await fetch("/api/user/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const error: any = await res.json();
                throw new Error(error.message || "Failed to export data");
            }

            toast.success("Data exported successfully");
            router.push("/");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to export data",
            );
            console.error("Export data error:", error);
        }
    };

    const handleDeleteChats = async () => {
        console.log("handleDeleteChats");
        try {
            const res = await fetch("/api/chats/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const error: any = await res.json();
                throw new Error(error.message || "Failed to delete all chats");
            }

            toast.success("Chats deleted successfully");
            router.push("/");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete chats",
            );
            console.error("Delete chats error:", error);
        }
    };

    const handleDeleteAccount = async () => {
        console.log("handleDeleteAccount");
        try {
            const res = await fetch("/api/user/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const error: any = await res.json();
                throw new Error(error.message || "Failed to delete account");
            }

            toast.success("Account deleted successfully");
            router.push("/");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete account",
            );
            console.error("Delete account error:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col w-3/4">
                    <h1 className="font-medium">Export Account Data</h1>
                    <p className="text-sm text-accent-foreground/70">
                        Download all data associated with this account.
                    </p>
                </div>
                <Button className="rounded-lg" onClick={handleDataExport}>
                    Export
                </Button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col w-3/4">
                    <h1 className="font-medium">Delete Conversations</h1>
                    <p className="text-sm text-accent-foreground/70">
                        Delete all the conversations
                    </p>
                </div>
                <Button
                    className="bg-rose-700 hover:bg-rose-600 text-white rounded-lg"
                    onClick={handleDeleteChats}
                >
                    Delete
                </Button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col w-3/4">
                    <h1 className="font-medium">Delete Account</h1>
                    <p className="text-sm text-accent-foreground/70">
                        Delete all the data associated with this account. This
                        action is irreversible.
                    </p>
                </div>
                <Button
                    className="bg-rose-700 hover:bg-rose-600 text-white rounded-lg"
                    onClick={handleDeleteAccount}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
