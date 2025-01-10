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
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-black">Edit Points for {playerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Select Round</label>
            <Select
              value={selectedRound}
              onValueChange={setSelectedRound}
            >
              <SelectTrigger className="bg-white border-gray-300 text-black">
                <SelectValue placeholder="Select round" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {[1, 2, 3, 4, 5].map((round) => (
                  <SelectItem 
                    key={round} 
                    value={round.toString()}
                    className="text-black hover:bg-gray-100"
                  >
                    Round {round}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Points</label>
            <Input
              type="number"
              placeholder="Enter points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="bg-white border-gray-300 text-black placeholder:text-gray-500"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-uber-dark text-white"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}