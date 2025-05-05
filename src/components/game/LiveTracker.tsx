interface LiveTrackerProps {
    gameId: string;
  }
  
  export default function LiveTracker({ gameId }: LiveTrackerProps) {
    return (
      <div>
        <h2 className="text-lg font-medium mb-2">Live Tracker</h2>
        <p>Stat tracking UI coming soon...</p>
        {/* This is where you'll implement your live tracking grid, stat buttons, pool, etc. */}
      </div>
    );
  }