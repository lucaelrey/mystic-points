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
    // Zuerst das Spiel beenden und Gewinner anzeigen
    endGameBase(players);
    // Verzögere das Zurücksetzen der Scores
    setTimeout(() => {
      resetPlayerScores();
      setCurrentRound(1);
    }, 100);
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