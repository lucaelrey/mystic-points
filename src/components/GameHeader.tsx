import { Crown } from "lucide-react";

interface GameHeaderProps {
  currentRound: number;
  maxRounds: number;
  gameStarted: boolean;
}

export function GameHeader({ currentRound, maxRounds, gameStarted }: GameHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 flex items-center justify-center gap-3">
        Mystic Points
        <Crown className="h-10 w-10 text-primary animate-pulse" />
      </h1>
      {gameStarted && (
        <div className="mt-6 animate-fade-in">
          <p className="text-2xl font-bold text-white inline-block px-8 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20">
            Round {currentRound} of {maxRounds}
          </p>
        </div>
      )}
      {!gameStarted && (
        <p className="text-lg text-white/60 mt-4">
          Begin your mystical journey by adding players
        </p>
      )}
    </div>
  );
}