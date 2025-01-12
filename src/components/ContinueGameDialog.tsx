import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, RefreshCw } from "lucide-react";

interface ContinueGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  onNewGame: () => void;
}

export function ContinueGameDialog({
  open,
  onOpenChange,
  onContinue,
  onNewGame,
}: ContinueGameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Continue Playing?</DialogTitle>
          <DialogDescription className="text-center">
            There is an ongoing game. Would you like to continue?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <Button
            onClick={onContinue}
            className="w-full bg-[#debe5d] hover:bg-[#debe5d]/90"
          >
            <Play className="mr-2" />
            Continue Game
          </Button>
          <Button
            onClick={onNewGame}
            variant="outline"
            className="w-full"
          >
            <RefreshCw className="mr-2" />
            New Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}