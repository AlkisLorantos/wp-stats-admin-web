"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getPlayerById } from "@/lib/data/players";

export default function PlayerProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: player, isLoading, isError } = useQuery({
    queryKey: ["player", id],
    queryFn: () => getPlayerById(Number(id)),
  });

  if (isLoading) return <p>Loading player...</p>;
  if (isError || !player) return <p>Player not found</p>;

  const totals = player.totals;
  const gameStats = player.games || [];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        {player.firstName} {player.lastName}
      </h1>

      <section className="bg-gray-100 rounded p-6 shadow">
        <h2 className="text-xl font-semibold mb-3">Season Totals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div>
            <p className="text-lg font-bold">{totals.goals}/{totals.shots}</p>
            <p className="text-sm text-gray-600">Goals/Shots</p>
          </div>
          <div>
            <p className="text-lg font-bold">{totals.assists}</p>
            <p className="text-sm text-gray-600">Assists</p>
          </div>
          <div>
            <p className="text-lg font-bold">{totals.steals}</p>
            <p className="text-sm text-gray-600">Steals</p>
          </div>
          <div>
            <p className="text-lg font-bold">{totals.blocks}</p>
            <p className="text-sm text-gray-600">Blocks</p>
          </div>
          <div>
            <p className="text-lg font-bold">{totals.exclusions}</p>
            <p className="text-sm text-gray-600">Exclusions</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Game Log</h2>
        <table className="w-full border rounded shadow text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Opponent</th>
              <th className="p-2">Goals</th>
              <th className="p-2">Shots</th>
              <th className="p-2">Assists</th>
              <th className="p-2">Steals</th>
              <th className="p-2">Blocks</th>
              <th className="p-2">Exclusions</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(gameStats) && gameStats.length > 0 ? (
  gameStats.map((game: any) => (
    <tr
      key={game.gameId}
      className="hover:bg-gray-100 cursor-pointer"
      onClick={() => router.push(`/games/${game.gameId}`)}
    >
      <td className="p-2">{new Date(game.date).toLocaleDateString()}</td>
      <td className="p-2">vs {game.opponent}</td>
      <td className="p-2 text-center">{game.goals}</td>
      <td className="p-2 text-center">{game.shots}</td>
      <td className="p-2 text-center">{game.assists}</td>
      <td className="p-2 text-center">{game.steals}</td>
      <td className="p-2 text-center">{game.blocks}</td>
      <td className="p-2 text-center">{game.exclusions}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={8} className="text-center p-4 text-gray-500">
      No game stats available.
    </td>
  </tr>
)}
</tbody>
        </table>
      </section>
    </div>
  );
}