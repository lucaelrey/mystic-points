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
              className="px-8 py-4 text-lg bg-mystic-dark hover:bg-mystic-dark/80 text-white border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
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
                className="px-8 py-4 text-lg bg-mystic-dark hover:bg-mystic-dark/80 text-white border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
                variant="outline"
              >
                End Game Early
              </Button>
            )}
          </>
        )}
        {!gameStarted && !showEndGameDialog && (
          <Button
            onClick={onResetGame}
            className={cn(
              "px-8 py-4 text-lg bg-mystic-dark hover:bg-mystic-dark/80 text-white border-2 border-primary/20 hover:border-primary/40 transition-all duration-300",
              !canStartGame && "opacity-50 cursor-not-allowed"
            )}
            disabled={!canStartGame}
          >
            Start New Game
          </Button>
        )}
      </div>

      <Dialog open={showRestartDialog} onOpenChange={setShowRestartDialog}>
        <DialogContent className="bg-black/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Game Reset</DialogTitle>
            <DialogDescription className="text-white/80 text-lg mt-2">
              The game has been reset. Players are ready for a new game.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowRestartDialog(false)}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowRestartDialog(false);
                onPreviousRound();
              }}
              className="bg-white text-black hover:bg-white/90"
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