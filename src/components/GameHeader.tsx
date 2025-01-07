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
        Mystic Points Tracker
        <Crown className="h-8 w-8 text-primary animate-pulse" />
      </h1>
      {gameStarted && (
        <div className="mt-4 mb-8">
          <p className="text-2xl font-bold text-mystic-light bg-mystic-dark/50 inline-block px-6 py-2 rounded-full border-2 border-primary/30">
            Round {currentRound} of {maxRounds}
          </p>
        </div>
      )}
    </div>
  );
}