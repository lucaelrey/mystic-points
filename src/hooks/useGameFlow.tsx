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

  const endGame = (players: Player[]) => {
    const winner = [...players].sort((a, b) => b.points - a.points)[0];
    setShowWinner(true);
    setGameStarted(false);
    toast({
      title: "Game Over!",
      description: `${winner.name} is crowned as the King of Mystara!`,
    });
  };

  return {
    gameStarted,
    showWinner,
    showEndGameDialog,
    setShowEndGameDialog,
    startGame,
    resetGame,
    endGame,
  };
}