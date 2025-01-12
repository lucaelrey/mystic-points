import { useState } from "react";
import { usePlayerManagement } from "./usePlayerManagement";
import { useRoundManagement } from "./useRoundManagement";
import { useGameFlow } from "./useGameFlow";
import { useLocalStorage } from "./useLocalStorage";
import { Player } from "@/types/game";

interface GameState {
  players: Player[];
  currentRound: number;
  maxRounds: number;
  gameStarted: boolean;
  showWinner: boolean;
}

export function useGameState() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Use localStorage for game state
  const [gameState, setGameState] = useLocalStorage<GameState>("gameState", {
    players: [],
    currentRound: 1,
    maxRounds: 5,
    gameStarted: false,
    showWinner: false,
  });

  const {
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    addPlayer,
    deletePlayer,
    updatePlayerPoints,
    resetPlayerScores,
  } = usePlayerManagement(gameState.players, (newPlayers) => {
    setGameState(prev => ({ ...prev, players: newPlayers }));
  });

  const {
    currentRound,
    setCurrentRound,
    canAdvanceRound,
    handlePreviousRound,
    handleAdvanceRound,
  } = useRoundManagement(players, gameState.currentRound, (newRound) => {
    setGameState(prev => ({ ...prev, currentRound: newRound }));
  });

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

  // Update game state when game status changes
  const updateGameState = (started: boolean, winner: boolean) => {
    setGameState(prev => ({ 
      ...prev, 
      gameStarted: started,
      showWinner: winner 
    }));
  };

  const startGame = () => {
    resetPlayerScores();
    setCurrentRound(1);
    startGameBase(players);
    updateGameState(true, false);
  };

  const resetGame = () => {
    resetPlayerScores();
    setCurrentRound(1);
    resetGameBase();
    // Clear localStorage when resetting the game
    setGameState({
      players: [],
      currentRound: 1,
      maxRounds: 5,
      gameStarted: false,
      showWinner: false,
    });
  };

  const endGame = () => {
    endGameBase(players);
    updateGameState(false, true);
  };

  const handleRoundsChange = (rounds: number) => {
    setGameState(prev => ({ ...prev, maxRounds: rounds }));
  };

  const addAdditionalRounds = (additionalRounds: number) => {
    setGameState(prev => ({ 
      ...prev,
      maxRounds: prev.maxRounds + additionalRounds,
      showWinner: false,
      gameStarted: true 
    }));
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
    maxRounds: gameState.maxRounds,
    handleRoundsChange,
    canAdvanceRound,
    handlePreviousRound: () => handlePreviousRound(resetGame),
    handleAdvanceRound: () => handleAdvanceRound(endGame, gameState.maxRounds),
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