import { useGameMode } from "@/contexts/GameModeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/number-input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GameSettingsProps {
  onStartGame: () => void;
  canStartGame: boolean;
}

export function GameSettings({ onStartGame, canStartGame }: GameSettingsProps) {
  const { gameMode, setGameMode } = useGameMode();
  const [rounds, setRounds] = useState(5);

  return (
    <div className="mb-8 text-center">
      <div className="inline-flex flex-col gap-4">
        <div className="inline-flex rounded-lg border border-accent p-1 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGameMode("rounds")}
            className={cn(
              "rounded-md px-3",
              gameMode === "rounds" 
                ? "bg-accent text-accent-foreground" 
                : "text-[#FFFFFF]"
            )}
          >
            Rounds
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGameMode("points")}
            className={cn(
              "rounded-md px-3",
              gameMode === "points" 
                ? "bg-accent text-accent-foreground" 
                : "text-[#FFFFFF]"
            )}
          >
            100 Points
          </Button>
        </div>
        
        {gameMode === "rounds" && (
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm text-violet-200/80">Number of Rounds</label>
            <div className="w-32">
              <Input
                value={rounds}
                onChange={setRounds}
                min={1}
                max={20}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}