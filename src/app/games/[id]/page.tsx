"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/fetchApi";
import { Method } from "@/types/definitions";
import { startGame, endGame, getGameById } from "@/lib/data/games";


type Game = {
  id: string;
  opponent: string;
  status: "LIVE" | "ENDED" | "UPCOMING";
};

export default function GamePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState(false);

  const fetchGame = async () => {
    try {
      const gameData = await getGameById(Number(id));
      setGame(gameData);
    } catch (err) {
      console.error("Failed to load game:", err);
      setError(true);
    }
  };
  useEffect(() => {
    fetchGame();
  }, [id]);


  const handleStartGame = async () => {
    try {
      await startGame(Number(id));
      setGame(prev => ({ ...prev!, status: "LIVE" }));    } catch (err) {
      console.error("Failed to start game:", err);
    }
  }

  const handleEndGame = async () => {
    try {
      await endGame(Number(id));
      setGame(prev => ({ ...prev!, status: "ENDED" }));
    } catch (err) {
      console.error("Failed to end game:", err);
    }
  }
  



  if (error) {
    return <p className="text-center text-red-500 mt-10">Game not found or access denied.</p>;
  }

  if (!game) {
    return <p className="text-center mt-10">Loading game...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Game vs. {game.opponent}</h1>
      <p className="text-gray-600 mb-8">Status: <span className="capitalize">{game.status}</span></p>
      <div>
      {
        game.status === 'UPCOMING' && (<button onClick={handleStartGame}>START GAME</button>)
      }
      {game.status === 'LIVE' && (
        <button onClick={handleEndGame}>END GAME</button>
      )}
      {game.status === 'ENDED' && (
        <span>Game is Over</span>
      )}
      
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link
          href={`/games/${game.id}/roster`}
          className="bg-blue-100 hover:bg-blue-200 p-6 rounded shadow text-center font-medium"
        >
          Set Roster
        </Link>
        <Link
          href={`/games/${game.id}/overview`}
          className="bg-blue-100 hover:bg-blue-200 p-6 rounded shadow text-center font-medium"
        >
          View Overview
        </Link>
        <Link
          href={`/games/${game.id}/track`}
          className="bg-green-100 hover:bg-green-200 p-6 rounded shadow text-center font-medium"
        >
          Track Stats
        </Link>
        <Link
          href={`/games/${game.id}/review`}
          className="bg-purple-100 hover:bg-purple-200 p-6 rounded shadow text-center font-medium"
        >
          Review Game
        </Link>
      </div>
    </div>
  );
}