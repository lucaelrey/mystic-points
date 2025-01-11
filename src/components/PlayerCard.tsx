import { Crown, Trash2, Edit, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { CountAnimation } from "./ui/count-animation";
import { motion } from "framer-motion";

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
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isTopPlayer = rank === 1 && Object.keys(roundPoints).length > 0;
  const hasCurrentRoundPoints = roundPoints[currentRound] !== undefined;
  const totalPoints = Object.values(roundPoints).reduce((sum, points) => sum + points, 0);

  useEffect(() => {
    if (hasCurrentRoundPoints) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [roundPoints, currentRound]);

  const handleNameSubmit = () => {
    if (editedName.trim() && onNameChange) {
      onNameChange(editedName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative group"
    >
      <div 
        className={cn(
          "relative rounded-lg border transition-all duration-200",
          isTopPlayer ? "border-violet-500/30 shadow-lg shadow-violet-500/10" : "border-white/10",
          gameStarted && !hasCurrentRoundPoints && "hover:border-violet-500/50 cursor-pointer",
          isHighlighted && "animate-highlight-pulse"
        )}
      >
        <div 
          className={cn(
            "p-4 rounded-lg bg-black/50 backdrop-blur-sm relative transition-all duration-200",
            gameStarted && !hasCurrentRoundPoints && "hover:bg-violet-500/5"
          )}
          onClick={() => {
            if (gameStarted && !hasCurrentRoundPoints) {
              onAddPoints();
            }
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                isTopPlayer ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-white/60"
              )}>
                <span className="text-sm font-bold">#{rank}</span>
              </div>

              {isEditingName ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="h-8 text-sm font-medium bg-white/5 border-white/10"
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
                <h3 className="text-sm font-medium text-white truncate">
                  {name}
                  {isTopPlayer && gameStarted && totalPoints > 0 && (
                    <Crown className="h-4 w-4 text-yellow-400 inline-block ml-2 animate-pulse" />
                  )}
                </h3>
              )}
            </div>

            <div className="flex items-center gap-4">
              <motion.div 
                className={cn(
                  "flex items-center gap-1.5",
                  isTopPlayer ? "text-violet-300" : "text-white/60"
                )}
                animate={{ scale: hasCurrentRoundPoints ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <CountAnimation number={totalPoints} className="text-lg font-bold" />
                <span className="text-xs opacity-60">pts</span>
              </motion.div>

              {!gameStarted && (
                <div className="flex items-center gap-1">
                  {!isEditingName && (
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
                      onDelete();
                    }}
                    className="p-1.5 text-red-400/70 hover:text-red-400 rounded-full hover:bg-white/5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              {gameStarted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPoints();
                  }}
                  className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/5"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {gameStarted && (
            <div className={cn(
              "mt-2 pt-2 border-t border-white/5",
              !hasCurrentRoundPoints && "opacity-60"
            )}>
              {!hasCurrentRoundPoints ? (
                <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                  <Plus className="h-3 w-3" />
                  <span>Add Round {currentRound} points</span>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-white/60 text-center"
                >
                  Round {currentRound}: {roundPoints[currentRound]} points
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}