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
      <DialogContent className="bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">End Game Early</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Are you sure you want to end the game now? Final scores will be calculated based on current points.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white border-gray-300 text-black hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-black hover:bg-uber-dark text-white"
          >
            End Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}