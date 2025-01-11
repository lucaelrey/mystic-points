import { createContext, useContext, ReactNode } from "react";

interface GameModeContextType {
  gameMode: "rounds";
  pointLimit: number;
}

const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

export function GameModeProvider({ children }: { children: ReactNode }) {
  const gameMode = "rounds";
  const pointLimit = 100;

  return (
    <GameModeContext.Provider value={{ gameMode, pointLimit }}>
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