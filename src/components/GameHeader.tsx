import { Crown } from "lucide-react";

interface GameHeaderProps {
  currentRound: number;
  maxRounds: number;
  gameStarted: boolean;
}

export function GameHeader({ currentRound, maxRounds, gameStarted }: GameHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
        Mystara Points Tracker
        <Crown className="h-8 w-8 text-primary animate-pulse" />
      </h1>
      {gameStarted && (
        <p className="text-mystic-light text-lg">
          Round {currentRound} of {maxRounds}
        </p>
      )}
    </div>
  );
}