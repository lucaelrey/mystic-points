import { useGameMode } from "@/contexts/GameModeContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameSettingsProps {
  onStartGame: () => void;
  canStartGame: boolean;
}

export function GameSettings({ onStartGame, canStartGame }: GameSettingsProps) {
  const { gameMode, setGameMode } = useGameMode();

  return (
    <div className="mb-8 text-center">
      <div className="inline-flex rounded-lg border border-accent p-1 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setGameMode("rounds")}
          className={cn(
            "rounded-md px-3",
            gameMode === "rounds" && "bg-accent text-accent-foreground"
          )}
        >
          5 Rounds
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setGameMode("points")}
          className={cn(
            "rounded-md px-3",
            gameMode === "points" && "bg-accent text-accent-foreground"
          )}
        >
          100 Points
        </Button>
      </div>
    </div>
  );
}