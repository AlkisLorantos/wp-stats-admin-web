// import { Method, Route } from "@/types/definitions";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// export async function fetchApi(method: Method, route: Route, key: string, data?: Object) {
//     const options: RequestInit = {
//         method,
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": key
//         },
//         cache: "no-store",
//     };

//     if (data && ["POST", "PUT", "DELETE"].includes(method)) {
//         options.body = JSON.stringify(data);
//     }

//     const res = await fetch(`${API_URL}/${route}`, options);

//     if (!res.ok) {
//         throw new Error(`Error ${res.status}: ${await res.text()}`);
//     }

//     return res.json();
// }

import { Method, Route } from "@/types/definitions";

export async function fetchApi(method: Method, route: Route, data?: Object) {
    const key = localStorage.getItem("apiKey"); // Get stored API key

    if (!key) {
        throw new Error("API key is missing. Please log in.");
    }

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": key,
        },
        cache: "no-store",
    };

    if (data && (method === "POST" || method === "PUT" || method === "DELETE")) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(`http://localhost:8000/${route}`, options);

    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
    }

    return res.json();
}
