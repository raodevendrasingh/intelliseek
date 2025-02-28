import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export const useFetchChatMessages = (chatId: string) => {
    const query = useQuery({
        queryKey: ["fetch-chat-message", chatId],
        queryFn: async () => {
            const res = await client.api.messages[":id"].$get({
                param: { id: chatId },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch chat messages");
            }
            const data = await res.json();
            return data;
        },
        enabled: !!chatId,
    });
    return query;
};
