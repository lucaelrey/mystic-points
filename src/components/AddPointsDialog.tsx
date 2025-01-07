import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddPointsDialogProps {
  playerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPoints: (points: number) => void;
}

export function AddPointsDialog({ playerName, open, onOpenChange, onAddPoints }: AddPointsDialogProps) {
  const [points, setPoints] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPoints = Number(points);
    if (!isNaN(numPoints)) {
      onAddPoints(numPoints);
      setPoints("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Points for {playerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="number"
            placeholder="Enter points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Add Points
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}