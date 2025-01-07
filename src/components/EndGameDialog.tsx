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
      <DialogContent className="bg-mystic-dark/90 backdrop-blur-lg border-2 border-primary/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">End Game Early</DialogTitle>
          <DialogDescription className="text-mystic-light/90 mt-2">
            Are you sure you want to end the game now? Final scores will be calculated based on current points.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-2 border-primary/20 text-mystic-light hover:bg-primary/10"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            End Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}