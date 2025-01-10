import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
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
            <RainbowButton
              onClick={onAdvanceRound}
              disabled={!canAdvanceRound}
              className={cn(
                "px-8 py-4 text-lg",
                !canAdvanceRound && "opacity-50 cursor-not-allowed"
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
            </RainbowButton>
            {currentRound > 1 && (
              <Button
                onClick={() => setShowEndGameDialog(true)}
                className="px-4 py-2 bg-mystic-dark hover:bg-mystic-dark/80 text-mystic-light border-2 border-accent/50"
                variant="outline"
              >
                End Game Early
              </Button>
            )}
          </>
        )}
        {!gameStarted && !showEndGameDialog && (
          <RainbowButton
            onClick={onResetGame}
            disabled={!canStartGame}
            className={cn(
              "px-8 py-4 text-lg",
              !canStartGame && "opacity-50 cursor-not-allowed"
            )}
          >
            Start New Game
          </RainbowButton>
        )}
      </div>

      <Dialog open={showRestartDialog} onOpenChange={setShowRestartDialog}>
        <DialogContent className="bg-mystic-dark/90 backdrop-blur-lg border-2 border-primary/20 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Restart Game</DialogTitle>
            <DialogDescription className="text-mystic-light/90 mt-2">
              Are you sure you want to restart the game? All progress will be lost, but players will remain.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowRestartDialog(false)}
              className="bg-transparent border-2 border-primary/20 text-mystic-light hover:bg-primary/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowRestartDialog(false);
                onPreviousRound();
              }}
              className="bg-primary hover:bg-primary/90 text-white"
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