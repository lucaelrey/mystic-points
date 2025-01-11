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
      <div className="absolute inset-0 rounded-xl border border-white/10" />
      <div 
        className={cn(
          "p-2.5 rounded-xl bg-black/90 backdrop-blur-xl relative transition-all duration-200",
          gameStarted && !hasCurrentRoundPoints && "hover:bg-white/5 cursor-pointer"
        )}
        onClick={() => {
          if (gameStarted && !hasCurrentRoundPoints) {
            onAddPoints();
          }
        }}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
          {!gameStarted && !isEditingName && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingName(true);
              }}
              className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/5"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditPoints();
            }}
            className={cn(
              "p-1.5 rounded-full hover:bg-white/5",
              gameStarted ? "text-white/70 hover:text-white" : "hidden"
            )}
          >
            <Edit className="h-3.5 w-3.5" />
          </button>
          {!gameStarted && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 text-red-400/70 hover:text-red-400 rounded-full hover:bg-white/5"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className={cn(
              "text-lg font-bold",
              isTopPlayer ? "text-white" : "text-white/60"
            )}>#{rank}</span>
            
            {isEditingName ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-sm font-semibold text-white bg-white/5 border-white/20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNameSubmit();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNameSubmit();
                  }}
                  className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/5"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 truncate">
                {name}
                {isTopPlayer && gameStarted && totalPoints > 0 && (
                  <Crown className="h-4 w-4 text-yellow-400 animate-pulse" />
                )}
              </h3>
            )}
            
            <div className={cn(
              "text-lg font-bold ml-auto",
              isTopPlayer ? "text-white" : "text-white/60"
            )}>
              <CountAnimation 
                number={totalPoints} 
                className="inline-block"
              />
              <span className="text-xs text-white/60 ml-1">pts</span>
            </div>
          </div>
        </div>
        
        {gameStarted && (
          <div className="mt-1.5">
            {!hasCurrentRoundPoints ? (
              <div className="text-xs text-white/60 text-center">
                Tap to add Round {currentRound} points
              </div>
            ) : (
              <div className="text-xs text-white/60">
                Round {currentRound} Points: {roundPoints[currentRound]}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}