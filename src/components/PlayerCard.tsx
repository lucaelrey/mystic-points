import { Crown, Trash2, Edit, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";
import NumberFlow from "./ui/number-flow";
import { BackgroundGradient } from "./ui/background-gradient";

interface PlayerCardProps {
  name: string;
  points: number;
  rank: number;
  currentRound: number;
  roundPoints: { [key: number]: number };
  onDelete: () => void;
  onAddPoints: () => void;
  onEditPoints: () => void;
  gameStarted: boolean;
  onNameChange?: (newName: string) => void;
}

export function PlayerCard({ 
  name, 
  points, 
  rank,
  currentRound,
  roundPoints, 
  onDelete, 
  onAddPoints,
  onEditPoints,
  gameStarted,
  onNameChange 
}: PlayerCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const isTopPlayer = rank === 1 && Object.keys(roundPoints).length > 0;
  const hasCurrentRoundPoints = roundPoints[currentRound] !== undefined;

  const handleNameSubmit = () => {
    if (editedName.trim() && onNameChange) {
      onNameChange(editedName.trim());
      setIsEditingName(false);
    }
  };

  const totalPoints = Object.values(roundPoints).reduce((sum, points) => sum + points, 0);

  return (
    <BackgroundGradient
      className="rounded-[22px] p-6"
      animate={isTopPlayer}
      containerClassName="w-full"
    >
      <div className="relative flex flex-col gap-6">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {!gameStarted && !isEditingName && (
            <button
              onClick={() => setIsEditingName(true)}
              className="p-2 text-white/60 hover:text-white/90 rounded-full hover:bg-white/5"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onEditPoints}
            className={cn(
              "p-2 rounded-full hover:bg-white/5",
              gameStarted ? "text-white/60 hover:text-white/90" : "hidden"
            )}
          >
            <Edit className="h-4 w-4" />
          </button>
          {!gameStarted && (
            <button
              onClick={onDelete}
              className="p-2 text-red-400/60 hover:text-red-400/90 rounded-full hover:bg-white/5"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <div className="flex items-center gap-2 w-full">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-xl font-medium text-white bg-white/5 border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNameSubmit();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={handleNameSubmit}
                  className="p-2 text-white/60 hover:text-white/90 rounded-full hover:bg-white/5"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-medium text-white flex items-center gap-2">
                  {name}
                  {isTopPlayer && gameStarted && totalPoints > 0 && (
                    <Crown className="h-5 w-5 text-yellow-400 animate-pulse" />
                  )}
                </h3>
              </>
            )}
          </div>
          
          <div className="text-white/60 text-sm">
            Rank #{rank}
          </div>
          
          <div className="text-4xl font-bold text-white">
            <NumberFlow value={totalPoints} trend={false} />
            <span className="text-sm text-white/60 ml-2">points</span>
          </div>
        </div>
        
        {gameStarted && (
          <div className="space-y-4">
            {!hasCurrentRoundPoints && (
              <button
                onClick={onAddPoints}
                className="w-full px-4 py-2 rounded-xl text-sm font-medium text-white/90 
                         bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 
                         border border-white/10 transition-colors"
              >
                Add Round {currentRound} Points
              </button>
            )}
            
            {hasCurrentRoundPoints && (
              <div className="text-sm text-white/60">
                Round {currentRound} Points: {roundPoints[currentRound]}
              </div>
            )}
          </div>
        )}
      </div>
    </BackgroundGradient>
  );
}