"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetchApi";
import GameHeader from "./GameHeader";
import LiveTracker from "./LiveTracker";
import ReviewStats from "./ReviewStats";
import UpcomingMessage from "./UpcomingMessage";
import GameOverSummary from "./GameOverSummary";

interface GameLayoutProps {
  gameId: string;
}

type GameState = "LIVE" | "UPCOMING" | "OVER" | "REVIEW";

export default function GameLayout({ gameId }: GameLayoutProps) {
  const [gameState, setGameState] = useState<GameState>("UPCOMING");

  useEffect(() => {
    const fetchGameState = async () => {
      const res = await fetchApi("GET", `games/${gameId}`);
      const status = res.data.status; // assuming API returns status: "LIVE", "OVER", etc.
      setGameState(status ?? "UPCOMING");
    };
    fetchGameState();
  }, [gameId]);

  return (
    <div className="p-6 space-y-6">
      <GameHeader gameId={gameId} gameState={gameState} />
      {gameState === "LIVE" && <LiveTracker gameId={gameId} />}
      {gameState === "REVIEW" && <ReviewStats gameId={gameId} />}
      {gameState === "UPCOMING" && <UpcomingMessage />}
      {gameState === "OVER" && <GameOverSummary gameId={gameId} />}
    </div>
  );
}