import { fetchApi } from "@/lib/fetchApi";

// Get all players for the logged-in team
export async function getPlayers() {
  const res = await fetchApi("GET", "players");
  return res.data;
}

// Get a single player by ID
export async function getPlayerById(id: number) {
    const res = await fetchApi("GET", `players/${id}`);
    return res.data;
  }
// Create a new player
export async function createPlayer(data: {
  firstName: string;
  lastName: string;
  position?: string;
  capNumber?: number;
}) {
  const res = await fetchApi("POST", "players", data);
  return res.data;
}

// Update an existing player
export async function updatePlayer(id: number, data: Partial<{
  firstName: string;
  lastName: string;
  position: string;
  capNumber: number;
}>) {
  const res = await fetchApi("PUT", `players/${id}`, data);
  return res.data;
}

// Delete a player
export async function deletePlayer(id: number) {
  const res = await fetchApi("DELETE", `players/${id}`);
  return res.data;
}