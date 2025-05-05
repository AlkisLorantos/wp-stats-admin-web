// components/CapGrid.tsx
"use client";

type CapAssignment = {
  capNumber: number;
  player: { id: number; firstName: string; lastName: string };
};

interface Props {
  roster: CapAssignment[];
  selectedPlayerId: number | null;
  onSelect: (playerId: number) => void;
}

export default function CapNumberGrid({ roster, selectedPlayerId, onSelect }: Props) {
  const spots = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 gap-4">
      {spots.map((capNum) => {
        const entry = roster.find((r) => r.capNumber === capNum);
        const isSelected = entry && entry.player.id === selectedPlayerId;

        return (
          <button
            key={capNum}
            onClick={() => entry && onSelect(entry.player.id)}
            className={`flex flex-col items-center justify-center p-3 border rounded ${
              isSelected ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
            disabled={!entry}
          >
            <span className="text-lg font-bold">#{capNum}</span>
            <span className="text-xs">
              {entry ? `${entry.player.firstName[0]}. ${entry.player.lastName}` : "Empty"}
            </span>
          </button>
        );
      })}
    </div>
  );
}