"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPlayer } from "@/lib/data/players";

export default function CreatePlayerPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [capNumber, setCapNumber] = useState<number | undefined>();
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createPlayer({ firstName, lastName, capNumber, position });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create player");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Player</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="First name"
          className="w-full border px-3 py-2 rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last name"
          className="w-full border px-3 py-2 rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Cap number (optional)"
          className="w-full border px-3 py-2 rounded"
          value={capNumber || ""}
          onChange={(e) => setCapNumber(e.target.value ? Number(e.target.value) : undefined)}
        />

        <input
          type="text"
          placeholder="Position (optional)"
          className="w-full border px-3 py-2 rounded"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Player
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </main>
  );
}