import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditPointsDialogProps {
  playerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditPoints: (round: number, points: number) => void;
}

export function EditPointsDialog({ 
  playerName, 
  open, 
  onOpenChange, 
  onEditPoints 
}: EditPointsDialogProps) {
  const [points, setPoints] = useState("");
  const [selectedRound, setSelectedRound] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPoints = Number(points);
    const round = Number(selectedRound);
    if (!isNaN(numPoints) && !isNaN(round)) {
      onEditPoints(round, numPoints);
      setPoints("");
      setSelectedRound("1");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-mystic-dark border-accent">
        <DialogHeader>
          <DialogTitle className="text-mystic-light">Edit Points for {playerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm text-mystic-light">Select Round</label>
            <Select
              value={selectedRound}
              onValueChange={setSelectedRound}
            >
              <SelectTrigger className="bg-mystic-dark border-accent text-mystic-light">
                <SelectValue placeholder="Select round" />
              </SelectTrigger>
              <SelectContent className="bg-mystic-dark border-accent">
                {[1, 2, 3, 4, 5].map((round) => (
                  <SelectItem 
                    key={round} 
                    value={round.toString()}
                    className="text-mystic-light hover:bg-accent/20"
                  >
                    Round {round}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-mystic-light">Points</label>
            <Input
              type="number"
              placeholder="Enter points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="bg-mystic-dark border-accent text-mystic-light placeholder:text-mystic-light/50"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}