"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatsForAnalysis } from "@/lib/data/stats"; // Make sure you have this
import { getPlayers } from "@/lib/data/players";

export default function AnalyticsPage() {
  const { data: players = [] } = useQuery({ queryKey: ["players"], queryFn: getPlayers });

  const { data: allStats = [] } = useQuery({
    queryKey: ["all-stats"],
    queryFn: async () => {
      const allStats: any[] = [];
      const games = await fetch("/games").then(res => res.json()); // Replace with actual query
      for (const game of games) {
        const res = await getGameStats(game.id);
        allStats.push(...res);
      }
      return allStats;
    },
  });

  const goalStats = allStats.filter((s) => s.type === "goal");
  const shotStats = allStats.filter((s) => s.type === "shot");

  const playerMap = players.reduce((acc, p) => {
    acc[p.id] = `${p.firstName} ${p.lastName}`;
    return acc;
  }, {} as Record<number, string>);

  const goalCounts: Record<number, number> = {};
  goalStats.forEach((s) => {
    goalCounts[s.playerId] = (goalCounts[s.playerId] || 0) + 1;
  });

  const topScorers = Object.entries(goalCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Team Analytics</h1>

      <section>
        <h2 className="text-xl font-semibold">Top Scorers</h2>
        <ul className="list-disc pl-6">
          {topScorers.map(([playerId, count]) => (
            <li key={playerId}>
              {playerMap[Number(playerId)] || "Unknown"} - {count} goals
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Totals</h2>
        <p>Total Goals: {goalStats.length}</p>
        <p>Total Shots: {shotStats.length}</p>
      </section>
    </div>
  );
}