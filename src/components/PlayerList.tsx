"use client";

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchApi";

export default function PlayerList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["players"],
        queryFn: async () => {
            console.log("🔄 Fetching players...");
            const result = await fetchApi("GET", "players");
            console.log("✅ Players fetched:", result);
            return result;
        },
    });

    // Ensure data exists and has `data` property
    const players = data?.data ?? [];

    if (isLoading) return <p>Loading players...</p>;
    if (isError) return <p>Error loading players.</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mt-6">Existing Players</h2>
            {players.length === 0 ? (
                <p>No players found.</p>
            ) : (
                <ul>
                    {players.map((player: any) => (
                        <li key={player.id} className="border p-2 mt-2">
                            {player.firstName} {player.lastName} - {player.position}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

