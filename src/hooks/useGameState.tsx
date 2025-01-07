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
  } = usePlayerManagement();

  const {
    currentRound,
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

  // Compose the functions with necessary dependencies
  const startGame = () => startGameBase(players);
  const resetGame = () => {
    resetGameBase();
    setPlayers([]);
  };
  const endGame = () => endGameBase(players);

  return {
    // Player Management
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    addPlayer,
    deletePlayer,
    updatePlayerPoints,
    
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