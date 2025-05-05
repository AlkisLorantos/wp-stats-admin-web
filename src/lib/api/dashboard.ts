export async function getPlayers(token: string) {
    const res = await fetch("http://localhost:8000/api/players", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to load players");
    return await res.json();
  }
  
  export async function getGames(token: string) {
    const res = await fetch("http://localhost:8000/api/games", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Failed to load games");
    return await res.json();
  }