import { useState } from "react";
import { usePlayerManagement } from "./usePlayerManagement";
import { useRoundManagement } from "./useRoundManagement";
import { useGameFlow } from "./useGameFlow";

export function useGameState() {
  const [isEditing, setIsEditing] = useState(false);
  const [maxRounds, setMaxRounds] = useState(5);
  
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
    setGameStarted,
    setShowWinner,
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
    setCurrentRound(1);
  };

  const handleRoundsChange = (rounds: number) => {
    setMaxRounds(rounds);
  };

  const addAdditionalRounds = (additionalRounds: number) => {
    setMaxRounds(prev => prev + additionalRounds);
    setShowWinner(false);
    setGameStarted(true);
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
    maxRounds,
    handleRoundsChange,
    canAdvanceRound,
    handlePreviousRound: () => handlePreviousRound(resetGame),
    handleAdvanceRound: () => handleAdvanceRound(endGame, maxRounds),
    addAdditionalRounds,
    
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