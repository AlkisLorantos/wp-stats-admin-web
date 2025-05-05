

export async function registerUser(username: string, password: string, teamName: string) {
    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, teamName }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || "Failed to register");
    }
  
    return data;
  }

  export async function loginUser(username: string, password: string) {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || "Failed to login");
    }
  
    return data;
  }