import { Button } from "@/components/ui/button";
import { useGameMode } from "@/contexts/GameModeContext";
import { cn } from "@/lib/utils";

interface GameSettingsProps {
  onStartGame: () => void;
  canStartGame: boolean;
}

export function GameSettings({ onStartGame, canStartGame }: GameSettingsProps) {
  const { gameMode, setGameMode } = useGameMode();

  return (
    <div className="space-y-4 p-6 bg-mystic-dark rounded-lg border border-accent/20">
      <h2 className="text-2xl font-bold text-mystic-light mb-4">Game Settings</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => setGameMode("rounds")}
          className={cn(
            "flex-1",
            gameMode === "rounds" && "bg-primary animate-mystic-glow"
          )}
        >
          5 Rounds Mode
        </Button>
        <Button
          onClick={() => setGameMode("points")}
          className={cn(
            "flex-1",
            gameMode === "points" && "bg-primary animate-mystic-glow"
          )}
        >
          100 Points Mode
        </Button>
      </div>
      <Button
        onClick={onStartGame}
        disabled={!canStartGame}
        className={cn(
          "w-full mt-4",
          canStartGame && "animate-mystic-glow"
        )}
      >
        Start New Game
      </Button>
    </div>
  );
}