"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchApi";

export default function CreateLeague() {
    const queryClient = useQueryClient();
    const [leagueName, setLeagueName] = useState("");
    const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason()); // Default to current season

    // React Query mutation for creating a league
    const mutation = useMutation({
        mutationFn: async (newLeague: any) => await fetchApi("POST", "leagues", newLeague),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leagues"] }); // Refresh league list
            setLeagueName(""); // Reset form
            setSelectedSeason(getCurrentSeason());
        },
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ name: leagueName, season: selectedSeason });
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Create a New League</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {/* League Name Input */}
                <input
                    type="text"
                    placeholder="League Name"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />

                {/* Season Dropdown */}
                <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="border p-2 w-full"
                    required
                >
                    {generateSeasons().map((season) => (
                        <option key={season} value={season}>
                            {season}
                        </option>
                    ))}
                </select>

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Create League
                </button>
            </form>
        </div>
    );
}

/** Function to generate past seasons dynamically */
function generateSeasons() {
    const currentYear = new Date().getFullYear();
    const seasons = [];

    for (let i = 0; i < 10; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        seasons.push(`${startYear}-${endYear}`);
    }

    return seasons;
}

/** Function to get the current season */
function getCurrentSeason() {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentYear + 1}`;
}
