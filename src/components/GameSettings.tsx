import { Input } from "@/components/ui/number-input";
import { useState } from "react";

interface GameSettingsProps {
  onStartGame: () => void;
  canStartGame: boolean;
}

export function GameSettings({ onStartGame, canStartGame }: GameSettingsProps) {
  const [rounds, setRounds] = useState(5);

  return (
    <div className="mb-8 text-center">
      <div className="inline-flex flex-col gap-4">
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
      </div>
    </div>
  );
}