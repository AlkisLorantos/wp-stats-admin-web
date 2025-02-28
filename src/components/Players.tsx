"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "@/lib/data/players";

export default function Players() {
    const { data: players, isLoading, isError } = useQuery({
        queryKey: ["players"],
        queryFn: getPlayers,
    });

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading players...</div>;
    }

    if (isError) {
        return (
            <div className="text-center text-red-500">
                Error loading players. Please try again later.
            </div>
        );
    }

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Players</h2>

            {players.length === 0 ? (
                <p className="text-gray-500">No players found.</p>
            ) : (
                <ul className="space-y-2">
                    {players.map((player: any) => (
                        <li key={player.id} className="p-3 border rounded-lg shadow">
                            <p className="text-lg font-semibold">{player.name}</p>
                            <p className="text-sm text-gray-500">Position: {player.position}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


