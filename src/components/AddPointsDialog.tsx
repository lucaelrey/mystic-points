import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { BackgroundGradient } from "./ui/background-gradient";

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
      setPoints(prev => prev + num);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/10 dark:bg-zinc-900/50 backdrop-blur-sm border-accent">
        <BackgroundGradient className="rounded-[22px] p-6">
          <DialogHeader>
            <DialogTitle className="text-white">Add Points for {playerName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {isMobile ? (
              <div className="space-y-4">
                <Input
                  type="text"
                  value={points}
                  readOnly
                  className="text-center text-2xl h-12 bg-white/5 border-accent text-white"
                />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleNumberClick(num.toString())}
                      className="h-16 text-2xl bg-white/5 hover:bg-accent/20 border border-accent text-white rounded-lg"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleNumberClick("clear")}
                    className="h-16 text-xl bg-white/5 hover:bg-accent/20 border border-accent text-white rounded-lg"
                  >
                    C
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNumberClick("0")}
                    className="h-16 text-2xl bg-white/5 hover:bg-accent/20 border border-accent text-white rounded-lg"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNumberClick("backspace")}
                    className="h-16 text-xl bg-white/5 hover:bg-accent/20 border border-accent text-white rounded-lg"
                  >
                    ←
                  </button>
                </div>
              </div>
            ) : (
              <Input
                type="number"
                placeholder="Enter points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="bg-white/5 border-accent text-white placeholder:text-white/50"
              />
            )}
            <button 
              type="submit" 
              className="w-full bg-violet-500 hover:bg-violet-600 text-white rounded-lg py-2 transition-colors"
            >
              Add Points
            </button>
          </form>
        </BackgroundGradient>
      </DialogContent>
    </Dialog>
  );
}
