import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Crown, RotateCcw } from "lucide-react";
import { useState } from "react";
import { EndGameDialog } from "./EndGameDialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  canStartGame: boolean;
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
  canStartGame,
}: GameControlsProps) {
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const [showRestartDialog, setShowRestartDialog] = useState(false);

  return (
    <>
      <div className="mt-8 flex justify-center gap-4">
        {gameStarted && (
          <>
            <Button
              onClick={() => currentRound === 1 ? setShowRestartDialog(true) : onPreviousRound()}
              className="px-4 py-2 bg-mystic-dark hover:bg-mystic-dark/80 text-mystic-light border-2 border-accent/50"
              variant="outline"
            >
              {currentRound === 1 ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restart Game
                </>
              ) : (
                <>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Round
                </>
              )}
            </Button>
            <Button
              onClick={onAdvanceRound}
              disabled={!canAdvanceRound}
              className={cn(
                "px-8 py-4 text-lg bg-primary hover:bg-primary/80 text-white",
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
                onClick={() => setShowEndGameDialog(true)}
                variant="destructive"
                className="px-8 py-4 text-lg bg-destructive hover:bg-destructive/80 text-white"
              >
                End Game Early
              </Button>
            )}
          </>
        )}
        {!gameStarted && !showEndGameDialog && (
          <Button
            onClick={onResetGame}
            disabled={!canStartGame}
            className={cn(
              "px-8 py-4 text-lg bg-primary hover:bg-primary/80 text-white",
              canStartGame && "animate-mystic-glow"
            )}
          >
            Start New Game
          </Button>
        )}
      </div>

      <Dialog open={showRestartDialog} onOpenChange={setShowRestartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Restart Game</DialogTitle>
            <DialogDescription>
              Are you sure you want to restart the game? All progress will be lost, but players will remain.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setShowRestartDialog(false)}
              className="border-white text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowRestartDialog(false);
                onPreviousRound();
              }}
              className="bg-[#B08FFF] hover:bg-[#9B7FEF] text-white"
            >
              Restart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EndGameDialog
        open={showEndGameDialog}
        onOpenChange={setShowEndGameDialog}
        onConfirm={() => {
          setShowEndGameDialog(false);
          onEndGame();
        }}
      />
    </>
  );
}