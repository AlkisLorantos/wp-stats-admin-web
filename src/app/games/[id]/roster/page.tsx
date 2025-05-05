"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPlayers } from "@/lib/data/players";
import {
  getRosterForGame as getGameRoster,
  assignRosterToGame as saveGameRoster,
} from "@/lib/data/roster";
import {
  getRosterPresets,
  getPresetById,
  saveRosterPreset,
} from "@/lib/data/rosterPreset";

export default function RosterAssignmentPage() {
  const { id } = useParams();
  const gameId = Number(id);
  const router = useRouter();

  const { data: players = [] } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  const { data: existingRoster = [] } = useQuery({
    queryKey: ["game-roster", gameId],
    queryFn: () => getGameRoster(gameId),
  });

  const { data: presets = [] } = useQuery({
    queryKey: ["roster-presets"],
    queryFn: getRosterPresets,
  });

  const [assignments, setAssignments] = useState<{ [cap: number]: number | null }>({});
  const [presetName, setPresetName] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<number | "">("");

  // Load game roster
  useEffect(() => {
    if (existingRoster.length > 0) {
      const preset: { [cap: number]: number } = {};
      existingRoster.forEach((entry) => {
        if (entry.capNumber) {
          preset[entry.capNumber] = entry.playerId;
        }
      });
      setAssignments(preset);
    }
  }, [existingRoster]);

  // Load selected preset
  useEffect(() => {
    if (selectedPresetId) {
      getPresetById(Number(selectedPresetId)).then((preset) => {
        const filled: { [cap: number]: number } = {};
        preset.players.forEach((entry) => {
          if (entry.capNumber) {
            filled[entry.capNumber] = entry.playerId;
          }
        });
        setAssignments(filled);
      });
    }
  }, [selectedPresetId]);

  const handleChange = (capNumber: number, playerId: number) => {
    setAssignments((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[Number(key)] === playerId) {
          updated[Number(key)] = null;
        }
      });
      updated[capNumber] = playerId;
      return updated;
    });
  };

  const mutation = useMutation({
    mutationFn: (data: { playerId: number; capNumber: number }[]) =>
      saveGameRoster(gameId, data),
    onSuccess: () => router.push(`/games/${gameId}`),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = Object.entries(assignments)
      .filter(([_, playerId]) => playerId)
      .map(([cap, playerId]) => ({
        capNumber: Number(cap),
        playerId: playerId!,
      }));
    mutation.mutate(data);
  };

  const handleSavePreset = () => {
    const data = Object.entries(assignments)
      .filter(([_, playerId]) => playerId)
      .map(([cap, playerId]) => ({
        capNumber: Number(cap),
        playerId: playerId!,
      }));

    if (presetName && data.length > 0) {
      saveRosterPreset({ name: presetName, roster: data }).then(() => {
        setPresetName("");
      });
    }
  };

  const assignedPlayerIds = Object.values(assignments).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Assign Roster – Cap Numbers 1–15</h1>

      {/* Load Preset */}
      <div className="flex gap-4 items-center">
        <label className="font-medium">Load Preset:</label>
        <select
          className="border rounded px-3 py-2"
          value={selectedPresetId}
          onChange={(e) =>
            setSelectedPresetId(e.target.value ? Number(e.target.value) : "")
          }
        >
          <option value="">— Select Preset —</option>
          {presets.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[...Array(15)].map((_, i) => {
          const cap = i + 1;
          return (
            <div key={cap} className="flex items-center gap-4">
              <label className="w-10 font-semibold">#{cap}</label>
              <select
                value={assignments[cap] ?? ""}
                onChange={(e) => handleChange(cap, Number(e.target.value))}
                className="flex-1 border rounded px-3 py-2"
              >
                <option value="">— Select Player —</option>
                {players.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={assignedPlayerIds.includes(p.id) && assignments[cap] !== p.id}
                  >
                    {p.firstName} {p.lastName}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Save current as preset..."
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            type="button"
            onClick={handleSavePreset}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Preset
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Roster
        </button>
      </form>
    </div>
  );
}