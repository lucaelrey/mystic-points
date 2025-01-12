import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Player } from "@/types/game";

export function useGameFlow() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const { toast } = useToast();

  const startGame = (players: Player[]) => {
    if (players.length >= 2) {
      setGameStarted(true);
      toast({
        title: "Game Started",
        description: "5 Rounds mode selected",
      });
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowWinner(false);
    setShowEndGameDialog(false);
    toast({
      title: "Game Reset",
      description: "Start a new game by adding players",
    });
  };

  const findWinners = (players: Player[]): Player[] => {
    if (players.length === 0) return [];
    const lowestScore = Math.min(...players.map(p => 
      Object.values(p.roundPoints).reduce((sum, points) => sum + points, 0)
    ));
    return players.filter(p => 
      Object.values(p.roundPoints).reduce((sum, points) => sum + points, 0) === lowestScore
    );
  };

  const endGame = (players: Player[]) => {
    const winners = findWinners(players);
    const winnerNames = winners.map(w => w.name).join(" & ");
    setShowWinner(true);
    setGameStarted(false);
    toast({
      title: "Game Over!",
      description: `${winnerNames} ${winners.length > 1 ? 'are' : 'is'} crowned as the ${winners.length > 1 ? 'Kings' : 'King'} of Mystara!`,
    });
  };

  return {
    gameStarted,
    setGameStarted,
    showWinner,
    setShowWinner,
    showEndGameDialog,
    setShowEndGameDialog,
    startGame,
    resetGame,
    endGame,
    findWinners,
  };
}