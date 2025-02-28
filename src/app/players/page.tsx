import Players from "@/components/Players";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPlayers } from "@/lib/data/players";

export default async function page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['players'],
        queryFn: getPlayers,
        staleTime: 4 * 1000,
    });

    return (
        <main className="h-screen w-full bg-white p-20 flex flex-col space-y-10">
            <h1 className="text-3xl font-bold">Players</h1>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Players />
            </HydrationBoundary>
        </main>
    )
}

