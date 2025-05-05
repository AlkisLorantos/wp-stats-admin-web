"use client";

import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Create New</h1>
            <button onClick={() => router.push("/create/player")}>New Player</button>
            <button onClick={() => router.push("/create/team")}>New Team</button>
            <button onClick={() => router.push("/create/league")}>New League</button>
        </div>
    );
}
