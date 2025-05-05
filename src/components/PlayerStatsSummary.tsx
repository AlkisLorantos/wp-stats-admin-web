"use client";

type PlayerStatSummaryProps = {
  total: {
    goals: number;
    shots: number;
    assists: number;
    steals: number;
    blocks: number;
    exclusions: number;
    gamesPlayed: number;
  };
};

export default function PlayerStatsSummary({ total }: PlayerStatSummaryProps) {
  const shootingPercentage =
    total.shots > 0 ? ((total.goals / total.shots) * 100).toFixed(1) : "0";

  const avg = (stat: number) =>
    total.gamesPlayed > 0 ? (stat / total.gamesPlayed).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-lg p-6 bg-white shadow">
      <div>
        <h2 className="font-semibold text-lg mb-2">Shooting Efficiency</h2>
        <p>
          <strong>Goals/Shots:</strong> {total.goals} / {total.shots}
        </p>
        <p>
          <strong>Shooting %:</strong> {shootingPercentage}%
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Playmaking</h2>
        <p>
          <strong>Assists:</strong> {total.assists} (Avg: {avg(total.assists)})
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Defensive Impact</h2>
        <p>
          <strong>Steals:</strong> {total.steals} (Avg: {avg(total.steals)})
        </p>
        <p>
          <strong>Blocks:</strong> {total.blocks} (Avg: {avg(total.blocks)})
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Discipline</h2>
        <p>
          <strong>Exclusions:</strong> {total.exclusions} (Avg: {avg(total.exclusions)})
        </p>
      </div>
    </div>
  );
}