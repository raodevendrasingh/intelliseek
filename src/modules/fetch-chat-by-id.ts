import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export const useFetchChatById = (chatId: string) => {
    const query = useQuery({
        queryKey: ["fetch-chat-by-id", chatId],
        queryFn: async () => {
            const res = await client.api.chat[":id"].$get({
                param: { id: chatId },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch chat");
            }
            const data = await res.json();
            return data;
        },
        enabled: !!chatId,
    });
    return query;
};
