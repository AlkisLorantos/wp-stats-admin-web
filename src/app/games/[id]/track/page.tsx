"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getRosterForGame, getCurrentLineup, submitSubstitution } from "@/lib/data/roster";
import { createStat } from "@/lib/data/stats";

import { PlayerWithCapNumber } from "@/types/player";
import { Dialog } from "@headlessui/react";
import clsx from "clsx"

const STAT_TYPES = ["goal", "shot", "assist", "steal", "block", "exclusion"];
const CONTEXT_TYPES = ["powerplay", "penalty", "counterattack"];

export default function StatTrackingPage() {
  const { id } = useParams();
  const gameId = Number(id);

  const { data: roster = [] } = useQuery({
    queryKey: ["roster", gameId],
    queryFn: () => getRosterForGame(gameId),
  });

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [statType, setStatType] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [clock, setClock] = useState<number | null>(null);
  // const [lineup, setLineup] = useState<number[]>([]);
  // const [showLineupDialog, setShowLineupDialog] = useState(true);
  // const [quarter, setQuarter] = useState(1);

  const mutation = useMutation({
    mutationFn: createStat,
    onSuccess: () => {
      setStatType(null);
      setContext(null);
      setClock(null);
    },
  });

  useEffect(() => {
    console.log(roster)
  }, []);

  const handleSubmit = () => {
    const selectedPlayer = roster.find((player: { id: number | null; }) => player.id == selectedPlayerId)
    console.log(selectedPlayerId)
    console.log(roster)
    if (!selectedPlayerId || !statType) return;

    mutation.mutate({
      gameId,
      playerId: selectedPlayerId,
      type: statType,
      context: context || undefined,
      clock: clock ?? undefined,
    });
  };

  // const inGame = roster.filter((p) => lineup.includes(p.id));
  // const bench = roster.filter((p) => !lineup.includes(p.id));

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Player List */}
      <div className="w-1/3 border-r overflow-y-auto p-4 space-y-6 bg-gray-50">
         <div>
          <h2 className="text-lg font-bold mb-2">In Water</h2>
          <div className="space-y-2">
            {roster.map((player) => (
              <button
                key={player.playerId}
                onClick={() => setSelectedPlayerId(player.playerId)
                }
                
                className={`w-full text-left px-4 py-2 rounded-lg border ${
                  selectedPlayerId === player.playerId ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                #{player.capNumber || "?"} {player.name}
              </button>
            ))}
          </div>
        </div>
        </div>
      <div>
    </div>
      
      {/* Stat Panel */ }
  <div className="flex-1 p-6 overflow-y-auto">
    {selectedPlayerId ? (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Log Stat for Player #{selectedPlayerId}</h1>

        {/* Stat Type */}
        <div className="space-y-2">
          <p className="font-medium">Choose Stat Type:</p>
          <div className="flex flex-wrap gap-3">
            {STAT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setStatType(type)}
                className={`px-4 py-2 rounded border text-lg ${statType === type ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Context */}
        <div className="space-y-2">
          <p className="font-medium">Play Context:</p>
          <div className="flex flex-wrap gap-3">
            {CONTEXT_TYPES.map((c) => (
              <button
                key={c}
                onClick={() => setContext(c === context ? null : c)}
                className={`px-4 py-2 rounded border text-lg ${context === c ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Clock */}
        <div className="flex items-center gap-4">
          <label className="font-medium text-lg">Clock (min.dec):</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="8"
            value={clock ?? ""}
            onChange={(e) => setClock(Number(e.target.value))}
            placeholder="e.g. 3.5"
            className="border rounded px-3 py-2 w-32"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 text-lg"
        >
          Submit Stat
        </button>
      </div>
    ) : (
      <p className="text-xl text-gray-500">Select a player to start logging stats.</p>
    )}
  </div>
    </div >
  );
}