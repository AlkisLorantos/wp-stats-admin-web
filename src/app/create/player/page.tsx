"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchApi";

export default function CreatePlayer() {
    const queryClient = useQueryClient();
    const [teams, setTeams] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        nationality: "",
        position: "",
        capNumber: "",
        teamId: "",
    });

    // Fetch teams for selection
    useEffect(() => {
        fetchApi("GET", "team")
            .then((response) => setTeams(response))
            .catch((error) => console.error("Error fetching teams:", error));
    }, []);

    const mutation = useMutation({
        mutationFn: async (newPlayer: any) => {
            return await fetchApi("POST", "players", newPlayer);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
            setFormData({
                firstName: "",
                lastName: "",
                birthday: "",
                nationality: "",
                position: "",
                capNumber: "",
                teamId: "",
            });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedBirthday = new Date(formData.birthday).toISOString();
        if (isNaN(new Date(formData.birthday).getTime())) {
            alert("Invalid date format. Please enter a valid date.");
            return;
        }

        const playerData = {
            ...formData,
            birthday: formattedBirthday,
            capNumber: Number(formData.capNumber),
            teamId: Number(formData.teamId),
        };

        mutation.mutate(playerData);
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Add a New Player</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 w-full" required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 w-full" required />
                <input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} className="border p-2 w-full" required />
                <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className="border p-2 w-full" required />
                
                <select name="position" value={formData.position} onChange={handleChange} className="border p-2 w-full" required>
                    <option value="">Select Position</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Center Forward">Center Forward</option>
                    <option value="Defender">Defender</option>
                </select>

                <input type="number" name="capNumber" placeholder="Cap Number" value={formData.capNumber} onChange={handleChange} className="border p-2 w-full" required />

                <select name="teamId" value={formData.teamId} onChange={handleChange} className="border p-2 w-full" required>
                    <option value="">Select Team</option>
                    {teams.map((team: any) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Player</button>
            </form>
        </div>
    );
}
