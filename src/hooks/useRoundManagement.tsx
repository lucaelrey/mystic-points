import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Player } from "@/types/game";

export function useRoundManagement(players: Player[]) {
  const [currentRound, setCurrentRound] = useState(1);
  const { toast } = useToast();

  const canAdvanceRound = () => {
    return players.length > 0 && players.every((player) => 
      player.roundPoints[currentRound] !== undefined && 
      player.roundPoints[currentRound] >= 0
    );
  };

  const handlePreviousRound = (resetGameFn: () => void) => {
    if (currentRound === 1) {
      resetGameFn();
      toast({
        title: "Game Reset",
        description: "The game has been reset. Players are ready for a new game.",
      });
    } else {
      setCurrentRound(prev => prev - 1);
      toast({
        title: "Round Changed",
        description: `Returned to round ${currentRound - 1}`,
      });
    }
  };

  const handleAdvanceRound = (endGameFn: () => void) => {
    if (!canAdvanceRound()) {
      toast({
        title: "Cannot Advance Round",
        description: "All players must have points assigned for the current round.",
        variant: "destructive",
      });
      return;
    }

    if (currentRound < 5) {
      setCurrentRound((prev) => prev + 1);
      toast({
        title: "Round Advanced",
        description: `Starting round ${currentRound + 1}`,
      });
    } else if (currentRound === 5) {
      endGameFn();
    }
  };

  return {
    currentRound,
    setCurrentRound,
    canAdvanceRound,
    handlePreviousRound,
    handleAdvanceRound,
  };
}