import { Crown, Sparkles, ArrowBigDown } from "lucide-react";
import { Button } from "./ui/button";

interface WinnerDisplayProps {
  winnerName: string;
  winnerScore: number;
  onStartNewGame: () => void;
}

export function WinnerDisplay({ winnerName, winnerScore, onStartNewGame }: WinnerDisplayProps) {
  return (
    <div className="text-center mb-8 p-8 bg-mystic-dark/50 rounded-lg border-2 border-primary animate-mystic-glow">
      <div className="flex justify-center items-center gap-2 mb-4">
        <Crown className="h-16 w-16 text-primary" />
        <ArrowBigDown className="h-12 w-12 text-destructive animate-bounce" />
      </div>
      
      <h2 className="text-3xl font-bold text-primary mb-2">
        All hail the King of Mystara!
      </h2>
      
      <div className="mb-6">
        <p className="text-2xl text-mystic-light mb-2">{winnerName}</p>
        <p className="text-xl text-destructive font-bold animate-pulse">
          Winning Score: {winnerScore}
        </p>
        <p className="text-sm text-mystic-light mt-2 italic">
          (Lowest Score Wins!)
        </p>
      </div>
      
      <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
      
      <Button 
        onClick={onStartNewGame}
        className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-white"
      >
        Start New Game
      </Button>
    </div>
  );
}