import { Crown, Trophy, Medal, ArrowBigDown } from "lucide-react";
import { Player } from "@/types/game";
import { cn } from "@/lib/utils";

interface WinnerDisplayProps {
  players: Player[];
}

export function WinnerDisplay({ players }: WinnerDisplayProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    const totalPointsA = Object.values(a.roundPoints).reduce((sum, points) => sum + points, 0);
    const totalPointsB = Object.values(b.roundPoints).reduce((sum, points) => sum + points, 0);
    return totalPointsA - totalPointsB;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-400" />;
      case 2:
        return <Trophy className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-8 w-8 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="text-center mb-8 p-8 bg-gradient-to-br from-violet-950/40 to-indigo-950/40 backdrop-blur-sm rounded-xl border-2 border-violet-500 animate-mystic-glow">
      <div className="flex justify-center mb-4">
        <ArrowBigDown className="h-12 w-12 text-red-400 animate-bounce" />
      </div>
      
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-6">
        Game Over!
      </h2>

      <div className="space-y-4 mb-8">
        {sortedPlayers.map((player, index) => {
          const totalPoints = Object.values(player.roundPoints).reduce((sum, points) => sum + points, 0);
          const rank = index + 1;
          
          return (
            <div 
              key={player.id}
              className={cn(
                "p-4 rounded-xl border-2 transition-all backdrop-blur-sm",
                rank === 1 
                  ? "bg-violet-950/40 border-violet-400 animate-pulse"
                  : "bg-violet-950/20 border-violet-500/30"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-violet-400">#{rank}</span>
                  {getRankIcon(rank)}
                  <div className="text-left">
                    <p className={cn(
                      "text-xl font-semibold",
                      rank === 1 ? "text-violet-400" : "text-white"
                    )}>
                      {player.name}
                    </p>
                    <div className="space-y-1">
                      {Object.entries(player.roundPoints).map(([round, points]) => (
                        <p key={round} className="text-sm text-white/60">
                          Round {round}: {points} Points
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-2xl font-bold",
                    rank === 1 ? "text-violet-400" : "text-white"
                  )}>
                    {totalPoints} Points
                  </p>
                  <p className="text-sm text-white/60">Total Score</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-white/60 italic">
        (Lowest score wins!)
      </div>
    </div>
  );
}