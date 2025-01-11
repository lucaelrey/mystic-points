import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EndGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function EndGameDialog({ open, onOpenChange, onConfirm }: EndGameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C]/95 backdrop-blur-lg border-t-2 border-[#8B5CF6]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#8B5CF6]">End Game Early</DialogTitle>
          <DialogDescription className="text-[#D6BCFA]/70">
            Are you sure you want to end the game now? Final scores will be calculated based on current points.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-2 border-[#8B5CF6]/20 text-[#D6BCFA] hover:bg-[#8B5CF6]/10"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white"
          >
            End Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}