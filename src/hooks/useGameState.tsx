import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGameMode } from "@/contexts/GameModeContext";

interface PlayerPoints {
  [round: number]: number;
}

export interface Player {
  id: string;
  name: string;
  points: number;
  roundPoints: PlayerPoints;
}

export function useGameState() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const { toast } = useToast();
  const { gameMode, pointLimit } = useGameMode();

  const addPlayer = (name: string) => {
    if (gameStarted) {
      toast({
        title: "Cannot add players",
        description: "Players can only be added before the game starts",
        variant: "destructive",
      });
      return;
    }
    
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      points: 0,
      roundPoints: {},
    };
    setPlayers((prev) => [...prev, newPlayer]);
    toast({
      title: "Player added",
      description: `${name} has been added to the game`,
    });
  };

  const deletePlayer = (id: string) => {
    if (gameStarted) {
      toast({
        title: "Cannot remove players",
        description: "Players cannot be removed during an active game",
        variant: "destructive",
      });
      return;
    }
    
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Player removed",
      description: "Player has been removed from the game",
    });
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
      toast({
        title: "Game Started",
        description: `${gameMode === 'rounds' ? '5 Rounds' : '100 Points'} mode selected`,
      });
    }
  };

  const resetGame = () => {
    setPlayers([]);
    setCurrentRound(1);
    setGameStarted(false);
    setShowWinner(false);
    setSelectedPlayer(null);
    setIsEditing(false);
    toast({
      title: "Game Reset",
      description: "Start a new game by adding players",
    });
  };

  const handlePreviousRound = () => {
    if (currentRound === 1) {
      resetGame();
    } else {
      setCurrentRound(prev => prev - 1);
      toast({
        title: "Round Changed",
        description: `Returned to round ${currentRound - 1}`,
      });
    }
  };

  const canAdvanceRound = () => {
    if (gameMode === "points") {
      const highestScore = Math.max(...players.map(p => p.points));
      return highestScore >= pointLimit;
    }
    return players.length > 0 && players.every((player) => 
      player.roundPoints[currentRound] !== undefined
    );
  };

  const handleAdvanceRound = () => {
    if (gameMode === "points" && canAdvanceRound()) {
      endGame();
    } else if (currentRound < 5 && canAdvanceRound()) {
      setCurrentRound((prev) => prev + 1);
      toast({
        title: "Round advanced",
        description: `Starting round ${currentRound + 1}`,
      });
    } else if (currentRound === 5 && canAdvanceRound()) {
      endGame();
    }
  };

  const endGame = () => {
    const winner = [...players].sort((a, b) => b.points - a.points)[0];
    setShowWinner(true);
    setGameStarted(false);
    toast({
      title: "Game Over!",
      description: `${winner.name} is crowned as the King of Mystara!`,
    });
  };

  return {
    players,
    selectedPlayer,
    setSelectedPlayer,
    isEditing,
    setIsEditing,
    currentRound,
    gameStarted,
    showWinner,
    showEndGameDialog,
    setShowEndGameDialog,
    addPlayer,
    deletePlayer,
    startGame,
    resetGame,
    handlePreviousRound,
    canAdvanceRound,
    handleAdvanceRound,
    endGame,
  };
}