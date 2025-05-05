"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "@/lib/data/players";
import { getGames } from "@/lib/data/games";

export default function CoachDashboard() {
  const { data: players = [] } = useQuery({ queryKey: ["players"], queryFn: getPlayers });
  const { data: games = [] } = useQuery({ queryKey: ["games"], queryFn: getGames });

  const upcomingGames = games.filter((g) => new Date(g.date) > new Date()).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Team Dashboard</h1>
      </header>

      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
        {upcomingGames.length === 0 ? (
          <p className="text-gray-500">No upcoming games</p>
        ) : (
          <ul className="space-y-2">
            {upcomingGames.map((game) => (
              <li key={game.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">vs {game.opponent}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(game.date).toLocaleString()} • {game.location || "TBD"}
                  </p>
                </div>
                <Link
                  href={`/games/${game.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit Game
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white shadow rounded p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Player Summary</h2>
          <Link href="/players/new" className="text-blue-600 hover:underline">
            + Add Player
          </Link>
        </div>
        {players.length === 0 ? (
          <p className="text-gray-500">No players added yet</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {players.map((player) => (
              <li key={player.id} className="border rounded p-3 shadow-sm bg-gray-50">
                <p className="font-medium">{player.firstName} {player.lastName}</p>
                <p className="text-sm text-gray-500">{player.position || "No position"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/games/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            New Game
          </Link>
          <Link href="/stats/analysis" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
            View Team Stats
          </Link>
        </div>
      </section>
    </div>
  );
}