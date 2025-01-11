interface GameHeaderProps {
  currentRound: number;
  maxRounds: number;
  gameStarted: boolean;
}

export function GameHeader({ currentRound, maxRounds, gameStarted }: GameHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-12 relative">
      <div className="absolute inset-0 bg-gradient-radial from-violet-500/20 via-transparent to-transparent opacity-50 -z-10"></div>
      <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-2 sm:mb-4">
        Mystic Points
      </h1>
      {gameStarted && (
        <div className="mt-4 sm:mt-6 animate-fade-in">
          <p className="text-xl sm:text-2xl font-bold text-white inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/20 backdrop-blur-sm shadow-lg">
            Round {currentRound} of {maxRounds}
          </p>
        </div>
      )}
      {!gameStarted && (
        <p className="text-base sm:text-lg text-violet-200/80 mt-2 sm:mt-4 font-light">
          Begin your mystical journey by adding players
        </p>
      )}
    </div>
  );
}