import { fetchApi } from "../fetchApi";
import { PlayerWithCapNumber } from "@/types/player";

export async function getLineup(gameId: number, quarter: number): Promise<PlayerWithCapNumber[]> {
  const res = await fetchApi("GET", `lineup/${gameId}?quarter=${quarter}`);
  return res.data;
}

export async function submitLineup(
  gameId: number,
  quarter: number,
  playerIds: number[]
): Promise<void> {
  await fetchApi("POST", `lineup/${gameId}`, { quarter, playerIds });
}