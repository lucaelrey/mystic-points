import { Player } from "@/types/game";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/number-input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface WinnerDisplayProps {
  players: Player[];
  onContinueGame?: (additionalRounds: number) => void;
}

export function WinnerDisplay({ players, onContinueGame }: WinnerDisplayProps) {
  const [showAddRoundsDrawer, setShowAddRoundsDrawer] = useState(false);
  const [additionalRounds, setAdditionalRounds] = useState(3);

  const sortedPlayers = [...players].sort((a, b) => {
    const totalPointsA = Object.values(a.roundPoints).reduce((sum, points) => sum + points, 0);
    const totalPointsB = Object.values(b.roundPoints).reduce((sum, points) => sum + points, 0);
    return totalPointsA - totalPointsB;
  });

  const getPlacementText = (index: number) => {
    switch (index) {
      case 0:
        return "1st Place 🥇";
      case 1:
        return "2nd Place 🥈";
      case 2:
        return "3rd Place 🥉";
      default:
        return `${index + 1}th Place`;
    }
  };

  const handleContinueGame = () => {
    onContinueGame?.(additionalRounds);
    setShowAddRoundsDrawer(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-8">
      <h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
        <Crown className="h-8 w-8 text-[#debe5d]" />
        Final Results
      </h2>
      
      <div className="space-y-4">
        {sortedPlayers.map((player, index) => {
          const totalPoints = Object.values(player.roundPoints).reduce((sum, points) => sum + points, 0);
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-6 rounded-lg backdrop-blur-sm border transition-all
                ${index === 0 ? 'bg-[#debe5d]/10 border-[#debe5d] shadow-lg' : 'bg-black/30 border-white/10'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    ${index === 0 ? 'bg-[#debe5d] text-black' : 'bg-white/10 text-white/60'}
                  `}>
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{player.name}</h3>
                    <p className="text-white/60">{getPlacementText(index)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{totalPoints}</div>
                  <div className="text-white/60 text-sm">Total Points</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {onContinueGame && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setShowAddRoundsDrawer(true)}
            className="bg-[#debe5d] text-black hover:bg-[#debe5d]/90"
          >
            Add More Rounds
          </Button>
        </div>
      )}

      <Drawer open={showAddRoundsDrawer} onOpenChange={setShowAddRoundsDrawer}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add More Rounds</DrawerTitle>
              <DrawerDescription>
                Choose the number of additional rounds
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 pb-0">
              <div className="flex flex-col items-center gap-4">
                <Input
                  value={additionalRounds}
                  onChange={setAdditionalRounds}
                  min={1}
                  max={10}
                />
              </div>
            </div>

            <DrawerFooter>
              <Button
                onClick={handleContinueGame}
                className="bg-[#debe5d] text-black hover:bg-[#debe5d]/90"
              >
                Add Rounds
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddRoundsDrawer(false)}
                className="bg-transparent border border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}