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

  return (
    <div className="text-center mb-8 p-8 bg-mystic-dark/50 rounded-lg border-2 border-primary animate-mystic-glow">
      <div className="flex justify-center mb-4">
        <ArrowBigDown className="h-12 w-12 text-destructive animate-bounce" />
      </div>
      
      <h2 className="text-3xl font-bold text-primary mb-6">
        Spiel beendet!
      </h2>

      <div className="text-sm text-mystic-light/60 italic mb-6">
        (Niedrigste Punktzahl gewinnt!)
      </div>
    </div>
  );
}