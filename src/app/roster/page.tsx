"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "@/lib/data/players";

export default function RosterPage() {
  const { data: players = [], isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Team Roster</h1>

      {isLoading ? (
        <p>Loading players...</p>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li key={player.id} className="border p-4 rounded hover:bg-gray-50">
              <Link href={`/players/${player.id}`} className="text-blue-600 hover:underline">
                {player.firstName} {player.lastName}
              </Link>{" "}
              <span className="text-sm text-gray-500">({player.position || "N/A"})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}