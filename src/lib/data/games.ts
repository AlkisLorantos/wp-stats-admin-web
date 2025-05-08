import { fetchApi } from "@/lib/fetchApi";

// Get all games for the logged-in team
export async function getGames() {
  const res = await fetchApi("GET", "games");
  return res.data;
}

// Get a single game by ID
export async function getGameById(id: number) {
  const res = await fetchApi("GET", `games/${id}`);
  return res.data;
}

// Create a new game
export async function createGame(data: {
    date: string;
    opponent: string;
    homeOrAway: "home" | "away";
    location?: string;
  }) {
    const formatted = {
      ...data,
      date: new Date(data.date).toISOString(),
    };
  
    return await fetchApi("POST", "games", formatted);
  }

// Update a game
export async function updateGame(id: number, data: Partial<{
  date: string;
  opponent: string;
  location: string;
  teamScore: number;
  opponentScore: number;
}>) {
  const res = await fetchApi("PUT", `games/${id}`, data);
  return res.data;
}

// Delete a game
export async function deleteGame(id: number) {
  const res = await fetchApi("DELETE", `games/${id}`);
  return res.data;
}

export const startGame = async (id: number) => {
  return await fetchApi("PATCH", `games/${id}/start`);
};

export const endGame = async (id: number) => {
  return await fetchApi("PATCH", `games/${id}/end`);
};

// GET /stats/roster/:gameId
export async function getGameRoster(gameId: number) {
    const res = await fetchApi("GET", `games/${gameId}/roster`);
    return res.data;
}

// POST /stats/roster/:gameId
export async function saveGameRoster(
    gameId: number,
    assignments: { [capNumber: number]: number | null }
  ) {
    const payload = Object.entries(assignments)
      .filter(([_, playerId]) => playerId !== null)
      .map(([capNumber, playerId]) => ({
        capNumber: Number(capNumber),
        playerId: playerId!,
      }));
  
    const res = await fetchApi("POST", `games/${gameId}/roster`, { roster: payload });
    return res.data;
}