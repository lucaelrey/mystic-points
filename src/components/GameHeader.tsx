interface GameHeaderProps {
  currentRound: number;
  maxRounds: number;
  gameStarted: boolean;
}

export function GameHeader({ currentRound, maxRounds, gameStarted }: GameHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-12 relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#debe5d]/20 via-transparent to-transparent opacity-50 -z-10"></div>
      
      <img 
        src="/lovable-uploads/0189c651-c9bd-4a23-8cfb-f3a08ebc3dd2.png"
        alt="Mystic"
        className="w-full max-w-[200px] sm:max-w-[400px] mx-auto mb-4 sm:mb-6 drop-shadow-[0_0_15px_rgba(218,165,32,0.3)]"
      />
      
      {gameStarted && (
        <div className="mt-4 sm:mt-6 animate-fade-in">
          <p className="text-xl sm:text-2xl font-bold text-white inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-[#debe5d]/10 backdrop-blur-md border border-[#debe5d]/20 shadow-lg">
            Round {currentRound} of {maxRounds}
          </p>
        </div>
      )}
      {!gameStarted && (
        <p className="text-base sm:text-lg text-[#debe5d]/80 mt-2 sm:mt-4 font-light">
          Begin your mystical journey by adding players
        </p>
      )}
    </div>
  );
}