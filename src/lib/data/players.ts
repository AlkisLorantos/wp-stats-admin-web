"use client";

import { fetchApi } from "../fetchApi";

export async function getPlayers() {
    try {
        const players = await fetchApi("GET", "players");
        return players || [];
    } catch (error) {
        console.error("Error fetching players:", error);
        return [];
    }
}
