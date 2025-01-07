import { Crown, Trash2, Edit, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";

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
  const isTopPlayer = rank === 1;
  const hasCurrentRoundPoints = roundPoints[currentRound] !== undefined;

  const handleNameSubmit = () => {
    if (editedName.trim() && onNameChange) {
      onNameChange(editedName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className={cn(
      "group relative p-6 bg-mystic-dark rounded-lg border-2 transition-all duration-300 animate-fade-in hover:animate-mystic-glow",
      isTopPlayer ? "border-primary" : "border-accent/50"
    )}>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        {!gameStarted && !isEditingName && (
          <button
            onClick={() => setIsEditingName(true)}
            className="p-2 text-primary hover:text-primary/80 rounded-full hover:bg-mystic-dark/50"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={onEditPoints}
          className={cn(
            "p-2 rounded-full hover:bg-mystic-dark/50",
            gameStarted ? "text-primary hover:text-primary/80" : "hidden"
          )}
        >
          <Edit className="h-4 w-4" />
        </button>
        {!gameStarted && (
          <button
            onClick={onDelete}
            className="p-2 text-destructive hover:text-destructive/80 rounded-full hover:bg-mystic-dark/50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-primary">#{rank}</span>
        {isEditingName ? (
          <div className="flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-xl font-semibold text-mystic-light"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNameSubmit();
                }
              }}
              autoFocus
            />
            <button
              onClick={handleNameSubmit}
              className="p-2 text-primary hover:text-primary/80 rounded-full hover:bg-mystic-dark/50"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <h3 className="text-xl font-semibold text-mystic-light flex items-center gap-2">
            {name}
            {isTopPlayer && gameStarted && points > 0 && (
              <Crown className="h-5 w-5 text-primary animate-pulse" />
            )}
          </h3>
        )}
      </div>
      
      <div className="flex flex-col gap-4">
        {gameStarted && (
          <>
            <div className="text-3xl font-bold text-primary">{points}</div>
            
            {!hasCurrentRoundPoints && (
              <button
                onClick={onAddPoints}
                className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors animate-mystic-glow"
              >
                Add Round {currentRound} Points
              </button>
            )}
            
            {hasCurrentRoundPoints && (
              <div className="text-sm text-mystic-light">
                Current Round Points: {roundPoints[currentRound]}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}