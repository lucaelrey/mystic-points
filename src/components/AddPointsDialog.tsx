import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

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
        // Only add the number if the result would be 3 digits or less
        const newValue = prev + num;
        if (newValue.length <= 3) {
          return newValue;
        }
        return prev;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-mystic-dark border-accent">
        <DialogHeader>
          <DialogTitle className="text-mystic-light">Add Points for {playerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isMobile ? (
            <div className="space-y-4">
              <Input
                type="text"
                value={points}
                readOnly
                className="text-center text-2xl h-12 bg-mystic-dark border-accent text-mystic-light"
              />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    variant="outline"
                    onClick={() => handleNumberClick(num.toString())}
                    className="h-16 text-2xl bg-mystic-dark hover:bg-accent/20 border-accent text-mystic-light"
                  >
                    {num}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNumberClick("clear")}
                  className="h-16 text-xl bg-mystic-dark hover:bg-accent/20 border-accent text-mystic-light"
                >
                  C
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNumberClick("0")}
                  className="h-16 text-2xl bg-mystic-dark hover:bg-accent/20 border-accent text-mystic-light"
                >
                  0
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNumberClick("backspace")}
                  className="h-16 text-xl bg-mystic-dark hover:bg-accent/20 border-accent text-mystic-light"
                >
                  ←
                </Button>
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
              className="bg-mystic-dark border-accent text-mystic-light placeholder:text-mystic-light/50"
              max="999"
            />
          )}
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Add Points
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}