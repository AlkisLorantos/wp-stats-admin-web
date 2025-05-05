interface GameHeaderProps {
    gameId: string;
    gameState: string;
  }
  
  export default function GameHeader({ gameId, gameState }: GameHeaderProps) {
    return (
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-xl font-semibold">Game #{gameId}</h1>
        <span className="px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 uppercase">
          {gameState}
        </span>
      </header>
    );
  }