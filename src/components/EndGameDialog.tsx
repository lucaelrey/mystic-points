import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EndGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function EndGameDialog({ open, onOpenChange, onConfirm }: EndGameDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white dark:bg-mystic-dark border-2 border-primary/20 shadow-lg">
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-2xl font-bold text-mystic-dark dark:text-white">
            End Game Early?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-mystic-dark/80 dark:text-white/80">
            Are you sure you want to end the game now? This will determine the winner based on current scores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="bg-mystic-light/10 hover:bg-mystic-light/20 text-mystic-dark dark:text-white border-2 border-primary/20">
            Return to Game
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            End Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}