"use client";

import { Method, Route } from "@/types/definitions";

export async function fetchApi(method: Method, route: Route, data?: Object) {
  if (typeof window === "undefined") {
    throw new Error("fetchApi can only be used on the client");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("JWT token is missing. Please log in.");
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  };

  if (data && ["POST", "PUT", "DELETE"].includes(method)) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${route}`, options);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch API Error:", errorText);
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const responseData = await res.json();

    return {
      data: Array.isArray(responseData)
        ? responseData
        : responseData.data || responseData,
    };
  } catch (error) {
    console.error("fetchApi request failed:", error);
    throw error;
  }
}