"use client";
import { Method, Route } from "@/types/definitions";

export async function fetchApi(method: Method, route: Route, data?: Object) {
    
    if (typeof window === "undefined") {
        throw new Error("fetchApi can only be used on the client");
    }

    const key = localStorage.getItem("apiKey");

    console.log("Fetching:", method, `/players`);
    console.log("Using API Key:", key);

    if (!key) {
        throw new Error("API key is missing. Please log in.");
    }

    console.log(" Sending Request with API Key:", key);

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key.replace("Bearer ", "")}`, // Ensure single Bearer
        },
        cache: "no-store",
    };

    if (data && ["POST", "PUT", "DELETE"].includes(method)) {
        options.body = JSON.stringify(data);
    }

    console.log("Fetching:", `http://localhost:8000/${route}`, options);

    try {
        const res = await fetch(`http://localhost:8000/${route}`, options);

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Fetch API Error:", errorText);
            throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const responseData = await res.json();
        console.log("API Response:", responseData);

        // Ensure response is wrapped in { data: ... }
        return { data: Array.isArray(responseData) ? responseData : responseData.data || responseData };
        
    } catch (error) {
        console.error("Fetch API error:", error);
        throw error;
    }
}
