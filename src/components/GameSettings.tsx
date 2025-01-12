import { Input } from "@/components/ui/number-input";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GameSettingsProps {
  onStartGame: () => void;
  canStartGame: boolean;
  onRoundsChange?: (rounds: number) => void;
}

export function GameSettings({ onStartGame, canStartGame, onRoundsChange }: GameSettingsProps) {
  const [rounds, setRounds] = useState(5);
  const [customRounds, setCustomRounds] = useState(false);

  const handleRoundsChange = (value: string) => {
    if (value === "custom") {
      setCustomRounds(true);
      return;
    }
    
    setCustomRounds(false);
    const newRounds = parseInt(value);
    setRounds(newRounds);
    onRoundsChange?.(newRounds);
  };

  const handleCustomRoundsChange = (value: number) => {
    setRounds(value);
    onRoundsChange?.(value);
  };

  return (
    <div className="mb-8 text-center">
      <div className="inline-flex flex-col gap-4">
        <RadioGroup
          defaultValue="5"
          onValueChange={handleRoundsChange}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="rounds-3" />
            <Label htmlFor="rounds-3" className="text-white">3 Runden</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="rounds-5" />
            <Label htmlFor="rounds-5" className="text-white">5 Runden</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10" id="rounds-10" />
            <Label htmlFor="rounds-10" className="text-white">10 Runden</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="rounds-custom" />
            <Label htmlFor="rounds-custom" className="text-white">Individuelle Rundenzahl</Label>
          </div>
        </RadioGroup>

        {customRounds && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <label className="text-sm text-violet-200/80">Anzahl der Runden</label>
            <div className="w-32">
              <Input
                value={rounds}
                onChange={handleCustomRoundsChange}
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