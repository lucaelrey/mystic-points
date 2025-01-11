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
        return <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />;
      case 2:
        return <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="text-center mx-4 sm:mx-auto mb-8 p-4 sm:p-8 bg-white/5 backdrop-blur-lg rounded-xl border-2 border-violet-500/20 shadow-lg animate-mystic-glow">
      <div className="flex justify-center mb-4">
        <ArrowBigDown className="h-8 w-8 sm:h-12 sm:w-12 text-violet-400 animate-bounce" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-4 sm:mb-6">
        Game Over!
      </h2>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {sortedPlayers.map((player, index) => {
          const totalPoints = Object.values(player.roundPoints).reduce((sum, points) => sum + points, 0);
          const rank = index + 1;
          
          return (
            <div 
              key={player.id}
              className={cn(
                "p-3 sm:p-4 rounded-xl border-2 transition-all backdrop-blur-sm",
                rank === 1 
                  ? "bg-white/10 border-violet-400/50 animate-pulse"
                  : "bg-white/5 border-violet-500/20"
              )}
            >
              <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2">
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="text-xl sm:text-2xl font-bold text-violet-400">#{rank}</span>
                  {getRankIcon(rank)}
                  <div className="text-left flex-1 sm:flex-none">
                    <p className={cn(
                      "text-lg sm:text-xl font-semibold truncate max-w-[150px] sm:max-w-none",
                      rank === 1 ? "text-violet-300" : "text-white"
                    )}>
                      {player.name}
                    </p>
                    <div className="hidden sm:block space-y-1">
                      {Object.entries(player.roundPoints).map(([round, points]) => (
                        <p key={round} className="text-xs sm:text-sm text-white/60">
                          Round {round}: {points} Points
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2 sm:block ml-auto">
                  <p className={cn(
                    "text-xl sm:text-2xl font-bold",
                    rank === 1 ? "text-violet-300" : "text-white"
                  )}>
                    {totalPoints} Points
                  </p>
                  <p className="text-xs sm:text-sm text-white/60">Total Score</p>
                </div>
              </div>
              <div className="sm:hidden mt-2 space-y-1">
                {Object.entries(player.roundPoints).map(([round, points]) => (
                  <p key={round} className="text-xs text-white/60">
                    Round {round}: {points} Points
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs sm:text-sm text-white/60 italic">
        (Lowest score wins!)
      </div>
    </div>
  );
}