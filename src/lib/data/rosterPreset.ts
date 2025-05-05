import { fetchApi } from "@/lib/fetchApi";

export async function getRosterPresets() {
  const res = await fetchApi("GET", "presets");
  return res.data;
}

export async function getPresetById(id: number) {
  const res = await fetchApi("GET", `presets/${id}`);
  return res.data;
}

export async function saveRosterPreset({
  name,
  roster,
}: {
  name: string;
  roster: { playerId: number; capNumber: number }[];
}) {
  const res = await fetchApi("POST", "presets", { name, roster });
  return res.data;
}