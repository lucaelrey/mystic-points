import { Crown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  name: string;
  points: number;
  rank: number;
  onDelete: () => void;
  onAddPoints: () => void;
}

export function PlayerCard({ name, points, rank, onDelete, onAddPoints }: PlayerCardProps) {
  const isTopPlayer = rank === 1;

  return (
    <div className={cn(
      "group relative p-6 bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md animate-fade-in",
      isTopPlayer && "border-primary"
    )}>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-destructive rounded-full hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-primary">#{rank}</span>
        <h3 className="text-xl font-semibold text-secondary flex items-center gap-2">
          {name}
          {isTopPlayer && <Crown className="h-5 w-5 text-yellow-400" />}
        </h3>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-secondary">{points}</div>
        <button
          onClick={onAddPoints}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Points
        </button>
      </div>
    </div>
  );
}