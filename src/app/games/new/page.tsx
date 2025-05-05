"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "@/lib/data/games";

export default function CreateGamePage() {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [opponent, setOpponent] = useState("");
  const [homeOrAway, setHomeOrAway] = useState<"home" | "away">("home");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createGame({ date, opponent, homeOrAway, location });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create game");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Game</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Opponent name"
          className="w-full border px-3 py-2 rounded"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          required
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="home"
              checked={homeOrAway === "home"}
              onChange={() => setHomeOrAway("home")}
            />
            Home
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="away"
              checked={homeOrAway === "away"}
              onChange={() => setHomeOrAway("away")}
            />
            Away
          </label>
        </div>

        <input
          type="text"
          placeholder="Location (optional)"
          className="w-full border px-3 py-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Game
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </main>
  );
}