import { Crown } from "lucide-react";

interface GameHeaderProps {
  currentRound: number;
  maxRounds: number;
  gameStarted: boolean;
}

export function GameHeader({ currentRound, maxRounds, gameStarted }: GameHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600 mb-4 flex items-center justify-center gap-3">
        Mystic Points
        <Crown className="h-12 w-12 text-violet-500 animate-pulse" />
      </h1>
      {gameStarted && (
        <div className="mt-6 animate-fade-in">
          <p className="text-2xl font-bold text-white inline-block px-8 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-600/20 border border-violet-500/20 backdrop-blur-sm">
            Round {currentRound} of {maxRounds}
          </p>
        </div>
      )}
      {!gameStarted && (
        <p className="text-lg text-white/60 mt-4 font-light">
          Begin your mystical journey by adding players
        </p>
      )}
    </div>
  );
}