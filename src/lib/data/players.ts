import { fetchApi } from "../fetchApi";

export async function getPlayers() {
    try {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        if (!key) throw new Error("API key is missing");

        const { data } = await fetchApi("GET", "players", key);
        return data || [];
    } catch (error) {
        console.error("Error fetching players:", error);
        return [];
    }
}
