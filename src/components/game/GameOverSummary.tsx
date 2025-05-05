interface GameOverSummaryProps {
    gameId: string;
  }
  
  export default function GameOverSummary({ gameId }: GameOverSummaryProps) {
    return (
      <div>
        <h2 className="text-lg font-medium mb-2">Game Summary</h2>
        <p>Final statistics and recap will be shown here.</p>
      </div>
    );
  }