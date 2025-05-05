import { fetchApi } from "@/lib/fetchApi";

export async function createStat(data: {
  gameId: number;
  playerId: number;
  type: string;
  context?: string;
  period?: number;
  clock?: number;
  x?: number;
  y?: number;
  capNumber?: number;
}) {
  const res = await fetchApi("POST", "stats", data);
  return res.data;
}


export async function getStatsForAnalysis() {
  const res = await fetchApi("GET", "stats/all");
  return res.data;
}