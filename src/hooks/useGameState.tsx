import { useState } from "react";
import { usePlayerManagement } from "./usePlayerManagement";
import { useRoundManagement } from "./useRoundManagement";
import { useGameFlow } from "./useGameFlow";

export function useGameState() {
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    addPlayer,
    deletePlayer,
    updatePlayerPoints,
    resetPlayerScores,
  } = usePlayerManagement();

  const {
    currentRound,
    setCurrentRound,
    canAdvanceRound,
    handlePreviousRound,
    handleAdvanceRound,
  } = useRoundManagement(players);

  const {
    gameStarted,
    showWinner,
    showEndGameDialog,
    setShowEndGameDialog,
    startGame: startGameBase,
    resetGame: resetGameBase,
    endGame: endGameBase,
  } = useGameFlow();

  const startGame = () => {
    resetPlayerScores();
    setCurrentRound(1);
    startGameBase(players);
  };

  const resetGame = () => {
    resetPlayerScores();
    setCurrentRound(1);
    resetGameBase();
  };

  const endGame = () => {
    endGameBase(players);
    resetPlayerScores();
    setCurrentRound(1);
  };

  return {
    // Player Management
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    addPlayer,
    deletePlayer,
    updatePlayerPoints,
    resetPlayerScores,
    
    // Round Management
    currentRound,
    canAdvanceRound,
    handlePreviousRound: () => handlePreviousRound(resetGame),
    handleAdvanceRound: () => handleAdvanceRound(endGame),
    
    // Game Flow
    gameStarted,
    showWinner,
    showEndGameDialog,
    setShowEndGameDialog,
    startGame,
    resetGame,
    endGame,
    
    // UI State
    isEditing,
    setIsEditing,
  };
}