"use client";

import { useState, useEffect } from "react";
import { PlayerWithCapNumber } from "@/types/player";

interface Props {
  open: boolean;
  roster: PlayerWithCapNumber[];
  onClose: () => void;
  onSubmit: (selectedIds: number[]) => void;
}

export default function LineupDialog({ open, roster, onClose, onSubmit }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) setSelectedIds([]);
  }, [open]);

  const togglePlayer = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 7
        ? [...prev, id]
        : prev
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-2">Select Starting Lineup (7 Players)</h2>

        <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
          {roster.map((p) => (
            <button
              key={p.id}
              onClick={() => togglePlayer(p.id)}
              className={`p-2 border rounded text-left ${
                selectedIds.includes(p.id) ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              #{p.capNumber || "?"} {p.name}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(selectedIds)}
            disabled={selectedIds.length !== 7}
            className={`px-4 py-2 rounded ${
              selectedIds.length === 7
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm Lineup
          </button>
        </div>
      </div>
    </div>
  );
}