import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
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

  return (
    <>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 px-4 w-full max-w-xl mx-auto">
        {gameStarted && (
          <>
            <RainbowButton
              onClick={onAdvanceRound}
              disabled={!canAdvanceRound}
              className={cn(
                "w-full sm:w-auto px-6 py-3 text-base",
                "flex items-center justify-center gap-2",
                !canAdvanceRound && "opacity-50 cursor-not-allowed"
              )}
            >
              {currentRound === maxRounds ? (
                <>
                  <Crown className="h-4 w-4" />
                  <span>Finish</span>
                </>
              ) : (
                <span>Next Round</span>
              )}
            </RainbowButton>

            <Button
              onClick={() => currentRound === 1 ? setShowRestartDialog(true) : onPreviousRound()}
              className={cn(
                "w-full sm:w-auto px-6 py-3 text-base bg-mystic-dark hover:bg-mystic-dark/80 text-white",
                "border-2 border-[#debe5d]/20 hover:border-[#debe5d]/40 transition-all duration-300",
                "flex items-center justify-center gap-2"
              )}
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
                className={cn(
                  "w-full sm:w-auto px-6 py-3 text-base bg-mystic-dark hover:bg-mystic-dark/80 text-white",
                  "border-2 border-[#debe5d]/20 hover:border-[#debe5d]/40 transition-all duration-300"
                )}
                variant="outline"
              >
                End Early
              </Button>
            )}
          </>
        )}
        {!gameStarted && !showEndGameDialog && (
          <RainbowButton
            onClick={onResetGame}
            className={cn(
              "w-full sm:w-auto px-6 py-3 text-base",
              "flex items-center justify-center gap-2",
              !canStartGame && "opacity-50 cursor-not-allowed"
            )}
            disabled={!canStartGame}
          >
            Start New Game
          </RainbowButton>
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