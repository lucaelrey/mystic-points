import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackgroundGradient } from "@/components/ui/background-gradient";

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
      <DialogContent className="bg-white/10 dark:bg-zinc-900/50 backdrop-blur-sm border-accent">
        <BackgroundGradient className="rounded-[22px] p-6">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Points for {playerName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm text-white">Select Round</label>
              <Select
                value={selectedRound}
                onValueChange={setSelectedRound}
              >
                <SelectTrigger className="bg-white/5 border-accent text-white">
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-accent">
                  {[1, 2, 3, 4, 5].map((round) => (
                    <SelectItem 
                      key={round} 
                      value={round.toString()}
                      className="text-white hover:bg-accent/20"
                    >
                      Round {round}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white">Points</label>
              <Input
                type="number"
                placeholder="Enter points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="bg-white/5 border-accent text-white placeholder:text-white/50"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-violet-500 hover:bg-violet-600 text-white rounded-lg py-2 transition-colors"
            >
              Save Changes
            </Button>
          </form>
        </BackgroundGradient>
      </DialogContent>
    </Dialog>
  );
}
