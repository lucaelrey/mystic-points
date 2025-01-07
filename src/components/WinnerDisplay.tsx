import { Crown, Sparkles } from "lucide-react";

interface WinnerDisplayProps {
  winnerName: string;
}

export function WinnerDisplay({ winnerName }: WinnerDisplayProps) {
  return (
    <div className="text-center mb-8 p-8 bg-mystic-dark/50 rounded-lg border-2 border-primary animate-mystic-glow">
      <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-primary mb-2">
        All hail the King of Mystara!
      </h2>
      <p className="text-2xl text-mystic-light mb-4">{winnerName}</p>
      <Sparkles className="h-8 w-8 text-primary mx-auto" />
    </div>
  );
}