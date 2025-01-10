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
      containerClassName="w-full"
      className="w-full"
    >
      <div className="p-6 rounded-3xl bg-black/80 backdrop-blur-xl">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {!gameStarted && !isEditingName && (
            <button
              onClick={() => setIsEditingName(true)}
              className="p-2 text-violet-300 hover:text-violet-200 rounded-full hover:bg-white/5"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onEditPoints}
            className={cn(
              "p-2 rounded-full hover:bg-white/5",
              gameStarted ? "text-violet-300 hover:text-violet-200" : "hidden"
            )}
          >
            <Edit className="h-4 w-4" />
          </button>
          {!gameStarted && (
            <button
              onClick={onDelete}
              className="p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-white/5"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <span className={cn(
            "text-2xl font-bold",
            isTopPlayer ? "text-violet-400" : "text-violet-400/60"
          )}>#{rank}</span>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-xl font-semibold text-white bg-white/5 border-violet-500/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNameSubmit();
                  }
                }}
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                className="p-2 text-violet-400 hover:text-violet-300 rounded-full hover:bg-white/5"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              {name}
              {isTopPlayer && gameStarted && totalPoints > 0 && (
                <Crown className="h-5 w-5 text-violet-400 animate-pulse" />
              )}
            </h3>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <div className={cn(
            "text-3xl font-bold",
            isTopPlayer ? "text-violet-400" : "text-violet-400/60"
          )}>
            <NumberFlow value={totalPoints} trend={false} />
            <span className="text-sm text-white/60 ml-2">points</span>
          </div>
          
          {gameStarted && (
            <>
              {!hasCurrentRoundPoints && (
                <button
                  onClick={onAddPoints}
                  className={cn(
                    "w-full px-4 py-2 rounded-lg transition-colors",
                    "bg-gradient-to-r from-violet-500/20 to-indigo-500/20",
                    "hover:from-violet-500/30 hover:to-indigo-500/30",
                    "border border-violet-500/20",
                    "text-white font-medium backdrop-blur-sm"
                  )}
                >
                  Add Round {currentRound} Points
                </button>
              )}
              
              {hasCurrentRoundPoints && (
                <div className="text-sm text-white/60">
                  Round {currentRound} Points: {roundPoints[currentRound]}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </BackgroundGradient>
  );
}