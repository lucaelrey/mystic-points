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
  const isTopPlayer = rank === 1 && Object.keys(roundPoints).length > 0;
  const hasCurrentRoundPoints = roundPoints[currentRound] !== undefined;

  const handleNameSubmit = () => {
    if (editedName.trim() && onNameChange) {
      onNameChange(editedName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className={cn(
      "group relative p-6 rounded-lg border transition-all duration-300",
      "bg-white shadow-md hover:shadow-lg",
      isTopPlayer ? "border-uber-red" : "border-gray-200"
    )}>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        {!gameStarted && !isEditingName && (
          <button
            onClick={() => setIsEditingName(true)}
            className="p-2 text-black hover:bg-gray-100 rounded-full"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={onEditPoints}
          className={cn(
            "p-2 rounded-full hover:bg-gray-100",
            gameStarted ? "text-black" : "hidden"
          )}
        >
          <Edit className="h-4 w-4" />
        </button>
        {!gameStarted && (
          <button
            onClick={onDelete}
            className="p-2 text-uber-red hover:bg-red-50 rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className={cn(
          "text-2xl font-bold",
          isTopPlayer ? "text-uber-red" : "text-black"
        )}>#{rank}</span>
        {isEditingName ? (
          <div className="flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-xl font-semibold text-black bg-white border-gray-300"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNameSubmit();
                }
              }}
              autoFocus
            />
            <button
              onClick={handleNameSubmit}
              className="p-2 text-black hover:bg-gray-100 rounded-full"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <h3 className="text-xl font-semibold text-black flex items-center gap-2">
            {name}
            {isTopPlayer && gameStarted && points > 0 && (
              <Crown className="h-5 w-5 text-uber-red" />
            )}
          </h3>
        )}
      </div>
      
      <div className="flex flex-col gap-4">
        {gameStarted && (
          <>
            <div className={cn(
              "text-3xl font-bold",
              isTopPlayer ? "text-uber-red" : "text-black"
            )}>{points}</div>
            
            {!hasCurrentRoundPoints && (
              <button
                onClick={onAddPoints}
                className={cn(
                  "w-full px-4 py-2 rounded-md transition-colors",
                  "bg-black hover:bg-uber-dark",
                  "text-white font-medium"
                )}
              >
                Add Round {currentRound} Points
              </button>
            )}
            
            {hasCurrentRoundPoints && (
              <div className="text-sm text-gray-600">
                Current Round Points: {roundPoints[currentRound]}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}