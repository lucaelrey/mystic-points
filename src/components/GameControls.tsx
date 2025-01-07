import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  gameStarted: boolean;
  currentRound: number;
  maxRounds: number;
  canAdvanceRound: boolean;
  onAdvanceRound: () => void;
  onEndGame: () => void;
  onResetGame: () => void;
}

export function GameControls({
  gameStarted,
  currentRound,
  maxRounds,
  canAdvanceRound,
  onAdvanceRound,
  onEndGame,
  onResetGame,
}: GameControlsProps) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {gameStarted && (
        <>
          <Button
            onClick={onAdvanceRound}
            disabled={!canAdvanceRound}
            className={cn(
              "px-8 py-4 text-lg",
              canAdvanceRound ? "animate-mystic-glow" : ""
            )}
          >
            {currentRound === maxRounds ? "End Game" : "Next Round"}
          </Button>
          <Button
            onClick={onEndGame}
            variant="destructive"
            className="px-8 py-4 text-lg"
          >
            End Game Early
          </Button>
        </>
      )}
      {!gameStarted && (
        <Button
          onClick={onResetGame}
          className="px-8 py-4 text-lg animate-mystic-glow"
        >
          Start New Game
        </Button>
      )}
    </div>
  );
}