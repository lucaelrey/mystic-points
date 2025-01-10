import { Crown, Trophy, Medal, ArrowBigDown } from "lucide-react";
import { Player } from "@/types/game";
import { cn } from "@/lib/utils";

interface WinnerDisplayProps {
  winnerName: string;
  winnerScore: number;
  onStartNewGame: () => void;
  players: Player[];
}

export function WinnerDisplay({ winnerName, winnerScore, onStartNewGame, players }: WinnerDisplayProps) {
  // Sort players by total points (ascending - lowest points wins)
  const sortedPlayers = [...players].sort((a, b) => {
    const totalPointsA = Object.values(a.roundPoints).reduce((sum, points) => sum + points, 0);
    const totalPointsB = Object.values(b.roundPoints).reduce((sum, points) => sum + points, 0);
    return totalPointsA - totalPointsB;
  });

  // Helper function to get rank icon
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
    <div className="text-center mb-8 p-8 bg-mystic-dark/50 rounded-lg border-2 border-primary animate-mystic-glow">
      <div className="flex justify-center mb-4">
        <ArrowBigDown className="h-12 w-12 text-destructive animate-bounce" />
      </div>
      
      <h2 className="text-3xl font-bold text-primary mb-6">
        Spiel beendet!
      </h2>

      <div className="space-y-4 mb-8">
        {sortedPlayers.map((player, index) => {
          const totalPoints = Object.values(player.roundPoints).reduce((sum, points) => sum + points, 0);
          const rank = index + 1;
          
          return (
            <div 
              key={player.id}
              className={cn(
                "p-4 rounded-lg border transition-all",
                rank === 1 
                  ? "bg-primary/20 border-primary animate-pulse"
                  : "bg-mystic-dark/30 border-accent/30"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">#{rank}</span>
                  {getRankIcon(rank)}
                  <div className="text-left">
                    <p className={cn(
                      "text-xl font-semibold",
                      rank === 1 ? "text-primary" : "text-mystic-light"
                    )}>
                      {player.name}
                    </p>
                    <p className="text-sm text-mystic-light/80">
                      Punkte: {totalPoints}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-mystic-light/60 italic mb-6">
        (Niedrigste Punktzahl gewinnt!)
      </div>
    </div>
  );
}