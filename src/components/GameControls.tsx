import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Crown } from "lucide-react";

interface GameControlsProps {
  gameStarted: boolean;
  currentRound: number;
  maxRounds: number;
  canAdvanceRound: boolean;
  onAdvanceRound: () => void;
  onPreviousRound: () => void;
  onEndGame: () => void;
  onResetGame: () => void;
  canGoBack: boolean;
}

export function GameControls({
  gameStarted,
  currentRound,
  maxRounds,
  canAdvanceRound,
  onAdvanceRound,
  onPreviousRound,
  onEndGame,
  onResetGame,
  canGoBack,
}: GameControlsProps) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {gameStarted && (
        <>
          <Button
            onClick={onPreviousRound}
            disabled={!canGoBack}
            className="px-4 py-2"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Round
          </Button>
          <Button
            onClick={onAdvanceRound}
            disabled={!canAdvanceRound}
            className={cn(
              "px-8 py-4 text-lg",
              canAdvanceRound && "animate-mystic-glow"
            )}
          >
            {currentRound === maxRounds ? (
              <>
                <Crown className="mr-2 h-5 w-5" />
                End Game
              </>
            ) : (
              "Next Round"
            )}
          </Button>
          {currentRound > 1 && (
            <Button
              onClick={onEndGame}
              variant="destructive"
              className="px-8 py-4 text-lg"
            >
              Finish Game Early
            </Button>
          )}
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