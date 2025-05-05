"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/data/games";

export default function GamesPage() {
  const { data: games = [], isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const now = new Date();

  const upcomingGames = games.filter((g) => new Date(g.date) > now);
  const pastGames = games
    .filter((g) => new Date(g.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Games</h1>
        <Link href="/games/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Game
          </button>
        </Link>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Upcoming Matches</h2>
        {upcomingGames.length === 0 ? (
          <p>No upcoming games.</p>
        ) : (
          <ul className="space-y-2">
            {upcomingGames.map((game) => (
              <li key={game.id}>
                <Link href={`/games/${game.id}`} className="text-blue-600 hover:underline">
                  vs {game.opponent} – {new Date(game.date).toLocaleString()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Past Games</h2>
        {pastGames.length === 0 ? (
          <p>No past games recorded.</p>
        ) : (
          <ul className="space-y-2">
            {pastGames.map((game) => (
              <li key={game.id}>
                <Link href={`/games/${game.id}`} className="text-blue-600 hover:underline">
                  vs {game.opponent} – {new Date(game.date).toLocaleString()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}