import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/number-input";
import { useState } from "react";
import { CircleIcon, Hash, HashIcon, Settings2 } from "lucide-react";

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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto"
        >
          {/* 3 Rounds */}
          <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
            <RadioGroupItem
              id="rounds-3"
              value="3"
              className="sr-only after:absolute after:inset-0"
            />
            <Hash className="opacity-60" size={20} aria-hidden="true" />
            <p className="text-xs font-medium leading-none text-foreground">3 Runden</p>
          </label>

          {/* 5 Rounds */}
          <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
            <RadioGroupItem
              id="rounds-5"
              value="5"
              className="sr-only after:absolute after:inset-0"
            />
            <Hash className="opacity-60" size={20} aria-hidden="true" />
            <p className="text-xs font-medium leading-none text-foreground">5 Runden</p>
          </label>

          {/* 10 Rounds */}
          <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
            <RadioGroupItem
              id="rounds-10"
              value="10"
              className="sr-only after:absolute after:inset-0"
            />
            <HashIcon className="opacity-60" size={20} aria-hidden="true" />
            <p className="text-xs font-medium leading-none text-foreground">10 Runden</p>
          </label>

          {/* Custom Rounds */}
          <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70">
            <RadioGroupItem
              id="rounds-custom"
              value="custom"
              className="sr-only after:absolute after:inset-0"
            />
            <Settings2 className="opacity-60" size={20} aria-hidden="true" />
            <p className="text-xs font-medium leading-none text-foreground">Individuelle Runden</p>
          </label>
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