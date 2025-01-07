import { createContext, useContext, ReactNode, useState } from "react";

type GameMode = "rounds" | "points";

interface GameModeContextType {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  pointLimit: number;
}

const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

export function GameModeProvider({ children }: { children: ReactNode }) {
  const [gameMode, setGameMode] = useState<GameMode>("rounds");
  const pointLimit = 100;

  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode, pointLimit }}>
      {children}
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  const context = useContext(GameModeContext);
  if (context === undefined) {
    throw new Error("useGameMode must be used within a GameModeProvider");
  }
  return context;
}