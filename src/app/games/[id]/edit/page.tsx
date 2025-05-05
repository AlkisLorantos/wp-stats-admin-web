"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { getGameById, updateGame } from "@/lib/data/games";
import { useState, useEffect } from "react";

type GameFormData = Partial<{
  date: string;
  opponent: string;
  location: string;
  homeOrAway: "home" | "away";
  teamScore: number;
  opponentScore: number;
}>;

export default function EditGamePage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(Number(id)),
  });

  const [form, setForm] = useState<GameFormData>({});

  useEffect(() => {
    if (data) {
      const game = data?.data || data;
      setForm({
        date: new Date(game.date).toISOString().slice(0, 16),
        opponent: game.opponent || "",
        location: game.location || "",
        homeOrAway: game.homeOrAway || "home",
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (formData: GameFormData) => updateGame(Number(id), formData),
    onSuccess: () => router.push("/dashboard"),
  });

  if (isLoading || !form.date) return <p>Loading game...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Edit Game</h1>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.opponent || !form.date) return;
          mutation.mutate(form);
        }}
      >
        <div>
          <label className="block font-medium">Opponent</label>
          <input
            type="text"
            value={form.opponent}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setForm({ ...form, opponent: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input
            type="datetime-local"
            value={form.date}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            value={form.location}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium">Home or Away</label>
          <select
            value={form.homeOrAway}
            className="w-full border rounded px-3 py-2"
            onChange={(e) =>
              setForm({
                ...form,
                homeOrAway: e.target.value as "home" | "away",
              })
            }
          >
            <option value="home">Home</option>
            <option value="away">Away</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}