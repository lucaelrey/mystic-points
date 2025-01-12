import { Button } from "@/components/ui/button";
import { StarBorder } from "@/components/ui/star-border";
import { cn } from "@/lib/utils";
import { ArrowLeft, Crown, RotateCcw } from "lucide-react";
import { useState } from "react";
import { EndGameDialog } from "./EndGameDialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const primaryButtonClass = cn(
    "w-full sm:w-auto px-6 py-3 text-base bg-[#debe5d] hover:bg-[#debe5d]/90 text-black",
    "border-2 border-[#debe5d] transition-all duration-300"
  );

  const secondaryButtonClass = cn(
    "w-full sm:w-auto px-6 py-3 text-base bg-black/50 hover:bg-[#debe5d]/20 text-white",
    "border-2 border-[#debe5d]/20 hover:border-[#debe5d]/40 transition-all duration-300"
  );

  return (
    <>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 px-4 w-full max-w-xl mx-auto">
        {gameStarted && (
          <>
            <Button
              onClick={onAdvanceRound}
              disabled={!canAdvanceRound}
              className={primaryButtonClass}
            >
              <div className="flex items-center justify-center gap-2">
                {currentRound === maxRounds ? (
                  <>
                    <Crown className="h-4 w-4" />
                    <span>Finish</span>
                  </>
                ) : (
                  <span>Next Round</span>
                )}
              </div>
            </Button>

            <Button
              onClick={() => currentRound === 1 ? setShowRestartDialog(true) : onPreviousRound()}
              className={secondaryButtonClass}
              variant="outline"
            >
              {currentRound === 1 ? (
                <>
                  <RotateCcw className="h-4 w-4" />
                  <span>Restart</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </>
              )}
            </Button>

            {currentRound > 1 && (
              <Button
                onClick={() => setShowEndGameDialog(true)}
                className={secondaryButtonClass}
                variant="outline"
              >
                End Early
              </Button>
            )}
          </>
        )}
        {!gameStarted && !showEndGameDialog && (
          <Button
            onClick={onResetGame}
            disabled={!canStartGame}
            className={primaryButtonClass}
          >
            <div className="flex items-center justify-center gap-2">
              Start New Game
            </div>
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