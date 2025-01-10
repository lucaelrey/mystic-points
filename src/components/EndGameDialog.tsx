import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface EndGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function EndGameDialog({ open, onOpenChange, onConfirm }: EndGameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/10 dark:bg-zinc-900/50 backdrop-blur-sm">
        <BackgroundGradient className="rounded-[22px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">End Game Early</DialogTitle>
            <DialogDescription className="text-white/90 mt-2">
              Are you sure you want to end the game now? Final scores will be calculated based on current points.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-violet-500/20 text-white rounded-lg transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
            >
              End Game
            </Button>
          </DialogFooter>
        </BackgroundGradient>
      </DialogContent>
    </Dialog>
  );
}
