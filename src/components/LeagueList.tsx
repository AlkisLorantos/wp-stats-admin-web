"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchApi } from "@/lib/fetchApi";

export default function LeagueList() {
    // Fetch leagues using React Query
    const { data: leagues, isLoading, isError } = useQuery({
        queryKey: ["leagues"],
        queryFn: async () => await fetchApi("GET", "leagues"),
    });

    return (
        <div>
            <div className="mt-4">
                <Link href="/leagues/new">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">+ Create New League</button>
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {isLoading && <p>Loading leagues...</p>}
                {isError && <p>Error loading leagues</p>}
                {leagues?.data?.length === 0 && <p>No leagues found</p>}
                {leagues?.data?.map((league: any) => (
                    <Link key={league.id} href={`/leagues/${league.id}`} className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
                        <h2 className="text-xl font-semibold">{league.name}</h2>
                        <p className="text-sm">Season: {league.season}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
