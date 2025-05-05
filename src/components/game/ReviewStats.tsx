interface ReviewStatsProps {
    gameId: string;
  }
  
  export default function ReviewStats({ gameId }: ReviewStatsProps) {
    return (
      <div>
        <h2 className="text-lg font-medium mb-2">Review & Analyze</h2>
        <p>Detailed post-game stat input and analysis will go here.</p>
      </div>
    );
  }