import { Crown, Trash2, Edit, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";
import { BackgroundGradient } from "./ui/background-gradient";
import { CountAnimation } from "./ui/count-animation";

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
    <div className="w-full relative group">
      <div className="absolute inset-0 rounded-3xl border border-white/10" />
      <div className="p-6 rounded-3xl bg-black/90 backdrop-blur-xl relative">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {!gameStarted && !isEditingName && (
            <button
              onClick={() => setIsEditingName(true)}
              className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/5"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onEditPoints}
            className={cn(
              "p-2 rounded-full hover:bg-white/5",
              gameStarted ? "text-white/70 hover:text-white" : "hidden"
            )}
          >
            <Edit className="h-4 w-4" />
          </button>
          {!gameStarted && (
            <button
              onClick={onDelete}
              className="p-2 text-red-400/70 hover:text-red-400 rounded-full hover:bg-white/5"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <span className={cn(
            "text-2xl font-bold",
            isTopPlayer ? "text-white" : "text-white/60"
          )}>#{rank}</span>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-xl font-semibold text-white bg-white/5 border-white/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNameSubmit();
                  }
                }}
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/5"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              {name}
              {isTopPlayer && gameStarted && totalPoints > 0 && (
                <Crown className="h-5 w-5 text-yellow-400 animate-pulse" />
              )}
            </h3>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <div className={cn(
            "text-3xl font-bold",
            isTopPlayer ? "text-white" : "text-white/60"
          )}>
            <CountAnimation 
              number={totalPoints} 
              className="inline-block"
            />
            <span className="text-sm text-white/60 ml-2">points</span>
          </div>
          
          {gameStarted && (
            <>
              {!hasCurrentRoundPoints && (
                <button
                  onClick={onAddPoints}
                  className={cn(
                    "w-full px-4 py-2 rounded-lg transition-colors",
                    "bg-white/5 hover:bg-white/10",
                    "border border-white/10 hover:border-white/20",
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
    </div>
  );
}