import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono-client";

export const useFetchChats = () => {
    const query = useQuery({
        queryKey: ["fetch-chats"],
        queryFn: async () => {
            const res = await client.api.chat.$get();

            if (!res.ok) {
                throw Error("failed to fetch chats");
            }
            const data = await res.json();
            return data;
        },
        staleTime: 60000,
    });
    return query;
};
