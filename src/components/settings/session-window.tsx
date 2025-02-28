import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Session } from "better-auth";
import { getSessionClient } from "@/utils/get-session-client";
import { getLocationFromIp } from "@/utils/get-location";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface SessionWithLocation extends Session {
    location?: {
        city?: string;
        country?: string;
        error?: string;
    };
}

export const SessionWindow = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRevoking, setIsRevoking] = useState<boolean>(false);
    const { data: session, refetch: refetchSessions } = authClient.useSession();

    if (!session) return null;

    const currentSessionId = session.session.id;
    const [sessions, setSessions] = useState<SessionWithLocation[]>([]);

    useEffect(() => {
        const fetchSessions = async () => {
            if (!session) return;

            setIsLoading(true);
            try {
                const response = await authClient.listSessions();

                const sessionsArray = response.data || [];

                const sessionsWithLocation = await Promise.all(
                    sessionsArray.map(async (session) => {
                        const location = await getLocationFromIp(
                            session.ipAddress!,
                        );
                        return { ...session, location };
                    }),
                );

                setSessions(sessionsWithLocation);
            } catch (error) {
                console.error("Error fetching sessions:", error);
                setSessions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessions();
    }, [session]);

    const revokeAllSessions = async () => {
        setIsRevoking(true);
        await authClient.revokeSessions();
        refetchSessions();
        setIsRevoking(false);
    };

    const currentSessionData = sessions.find((s) => s.id === currentSessionId);
    const otherSessions = sessions.filter((s) => s.id !== currentSessionId);

    return (
        <ScrollArea className="h-[400px] w-full">
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium px-2 py-2 rounded-lg">
                        Current Session
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">Location</TableHead>
                                <TableHead className="w-20">Client</TableHead>
                                <TableHead className="w-36">Created</TableHead>
                                <TableHead className="w-36">Expiry</TableHead>
                                <TableHead className="w-16">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        Loading session...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentSessionData && (
                                    <TableRow>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {currentSessionData.location
                                                        ?.error
                                                        ? "Unknown location"
                                                        : `${currentSessionData.location?.city}/ ${currentSessionData.location?.country}`}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {getSessionClient(
                                                        currentSessionData.userAgent as string,
                                                    )}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                currentSessionData.createdAt,
                                            ).toDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                currentSessionData.expiresAt,
                                            ).toDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-rose-600"
                                                onClick={async () => {
                                                    await authClient.revokeSession(
                                                        {
                                                            token: currentSessionData.token,
                                                        },
                                                    );
                                                    refetchSessions();
                                                }}
                                            >
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h2 className="text-lg font-medium px-2 py-2 rounded-lg">
                        Other Active Sessions
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">Location</TableHead>
                                <TableHead className="w-20">Client</TableHead>
                                <TableHead className="w-36">Created</TableHead>
                                <TableHead className="w-36">Expiry</TableHead>
                                <TableHead className="w-16">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center"
                                    >
                                        Loading sessions...
                                    </TableCell>
                                </TableRow>
                            ) : otherSessions.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center"
                                    >
                                        No other active sessions
                                    </TableCell>
                                </TableRow>
                            ) : (
                                otherSessions.map((sessionItem) => (
                                    <TableRow key={sessionItem.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {sessionItem.location?.error
                                                        ? "Unknown location"
                                                        : `${sessionItem.location?.city}/ ${sessionItem.location?.country}`}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {getSessionClient(
                                                        sessionItem.userAgent as string,
                                                    )}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                sessionItem.createdAt,
                                            ).toDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                sessionItem.expiresAt,
                                            ).toDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-rose-600"
                                                onClick={async () => {
                                                    await authClient.revokeSession(
                                                        {
                                                            token: sessionItem.token,
                                                        },
                                                    );
                                                    refetchSessions();
                                                }}
                                            >
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Button
                    className="hover:bg-rose-600 hover:text-white w-44 rounded-lg"
                    onClick={revokeAllSessions}
                >
                    {isRevoking ? "Logging out..." : "Logout from all devices"}
                </Button>
            </div>
            <ScrollBar />
        </ScrollArea>
    );
};
