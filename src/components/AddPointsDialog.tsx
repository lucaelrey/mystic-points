import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

interface AddPointsDialogProps {
  playerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPoints: (points: number) => void;
}

export function AddPointsDialog({ playerName, open, onOpenChange, onAddPoints }: AddPointsDialogProps) {
  const [points, setPoints] = useState("");
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPoints = Number(points);
    if (!isNaN(numPoints)) {
      onAddPoints(numPoints);
      setPoints("");
      onOpenChange(false);
    }
  };

  const handleNumberClick = (num: string) => {
    if (num === "clear") {
      setPoints("");
    } else if (num === "backspace") {
      setPoints(prev => prev.slice(0, -1));
    } else {
      setPoints(prev => {
        const newValue = prev + num;
        if (newValue.length <= 3) {
          return newValue;
        }
        return prev;
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black/95 border-t border-white/10">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-white/90">Add Points for {playerName}</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            {isMobile ? (
              <div className="space-y-4">
                <Input
                  type="text"
                  value={points}
                  readOnly
                  className="text-center text-3xl h-14 bg-black/50 border-white/10 text-white/90"
                />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <motion.button
                      key={num}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNumberClick(num.toString())}
                      className="h-16 text-2xl bg-black/50 hover:bg-[#debe5d]/20 border border-white/10 text-white/90 transition-colors rounded-lg"
                    >
                      {num}
                    </motion.button>
                  ))}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNumberClick("clear")}
                    className="h-16 text-xl bg-black/50 hover:bg-[#debe5d]/20 border border-white/10 text-white/90 transition-colors rounded-lg"
                  >
                    C
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNumberClick("0")}
                    className="h-16 text-2xl bg-black/50 hover:bg-[#debe5d]/20 border border-white/10 text-white/90 transition-colors rounded-lg"
                  >
                    0
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNumberClick("backspace")}
                    className="h-16 text-xl bg-black/50 hover:bg-[#debe5d]/20 border border-white/10 text-white/90 transition-colors rounded-lg"
                  >
                    ←
                  </motion.button>
                </div>
              </div>
            ) : (
              <Input
                type="number"
                placeholder="Enter points"
                value={points}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 3) {
                    setPoints(value);
                  }
                }}
                className="bg-black/50 border-white/10 text-white/90 placeholder:text-white/50"
                max="999"
              />
            )}
            <DrawerFooter className="px-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-[#debe5d] hover:bg-[#debe5d]/90 text-white transition-colors"
                >
                  Add Points
                </Button>
              </motion.div>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}