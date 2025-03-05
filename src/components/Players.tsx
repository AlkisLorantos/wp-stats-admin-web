"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchApi";
import PlayerList from "./PlayerList";

export default function Players() {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        nationality: "",
        position: "",
        capNumber: "",
        teamId: "",
    });

    // // Fetch players from API
    // const { data: players, isLoading, isError } = useQuery({
    //     queryKey: ["players"],
    //     queryFn: async () => {
    //         return await fetchApi("GET", "players", localStorage.getItem("apiKey") || "");
    //     },
    // });

    // Add new player mutation
    const mutation = useMutation({
        mutationFn: async (newPlayer: any) => {
            return await fetchApi("POST", "players", newPlayer);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] }); // Refresh player list
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

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Ensure birthday is converted to ISO format
        const formattedBirthday = new Date(formData.birthday).toISOString();
    
        // Validate the date
        if (isNaN(new Date(formData.birthday).getTime())) {
            alert("Invalid date format. Please enter a valid date.");
            return;
        }
    
        // Prepare the sanitized data
        const playerData = {
            ...formData,
            birthday: formattedBirthday, // Convert to ISO
            capNumber: Number(formData.capNumber), // Ensure it's a number
            teamId: Number(formData.teamId), // Ensure it's a number
        };
    
        mutation.mutate(playerData);
    };
    

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Add a New Player</h2>

            {/* Form to add players */}
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
                <input type="number" name="teamId" placeholder="Team ID" value={formData.teamId} onChange={handleChange} className="border p-2 w-full" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Player</button>
            </form>

            <PlayerList />
        </div>
    );
}
