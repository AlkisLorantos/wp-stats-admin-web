import { fetchApi } from "@/lib/fetchApi";

export async function getRosterForGame(gameId: number) {
  const res = await fetchApi("GET", `games/${gameId}/roster`);
  return res.data;
}

export async function assignRosterToGame(
    gameId: number,
    roster: { playerId: number; capNumber: number }[]
  ) {
    const res = await fetchApi("POST", `games/${gameId}/roster`, { roster }); // ✅ fix here
    return res.data;
  }



export async function getCurrentLineup(gameId: number, period: number) {
  return fetchApi("GET", `games/${gameId}/lineup?period=${period}`);
}

export async function submitSubstitution(
  gameId: number,
  playerOutId: number,
  playerInId: number,
  clock: number
) {
  return fetchApi("POST", `games/${gameId}/substitution`, {
    playerOutId,
    playerInId,
    clock,
  });
}