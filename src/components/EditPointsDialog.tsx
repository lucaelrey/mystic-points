import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black/95 border-t border-white/10">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-white/90">Edit Points for {playerName}</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-sm text-white/90">Select Round</label>
              <Select
                value={selectedRound}
                onValueChange={setSelectedRound}
              >
                <SelectTrigger className="bg-black/50 border-white/10 text-white/90">
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-white/10">
                  {[1, 2, 3, 4, 5].map((round) => (
                    <SelectItem 
                      key={round} 
                      value={round.toString()}
                      className="text-white/90 hover:bg-[#debe5d]/20"
                    >
                      Round {round}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/90">Points</label>
              <Input
                type="number"
                placeholder="Enter points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="bg-black/50 border-white/10 text-white/90 placeholder:text-white/50"
              />
            </div>
            <DrawerFooter className="px-0">
              <Button 
                type="submit" 
                className="w-full bg-[#debe5d] hover:bg-[#debe5d]/90 text-white"
              >
                Save Changes
              </Button>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}