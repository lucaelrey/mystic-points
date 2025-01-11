import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface AddPlayerDialogProps {
  onAddPlayer: (name: string) => void;
  children?: React.ReactNode;
}

export function AddPlayerDialog({ onAddPlayer, children }: AddPlayerDialogProps) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName("");
      setOpen(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children || (
          <Button 
            className="w-full bg-black/50 border border-white/10 text-white/90 hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors h-[72px] rounded-lg shadow-lg"
          >
            <Plus className="h-6 w-6 mr-2" />
            Spieler hinzufügen
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="bg-mystic-dark/90 backdrop-blur-lg border-t-2 border-primary/20">
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-primary">Add New Player</DrawerTitle>
            <DrawerDescription className="text-mystic-light/70">
              Enter the name of the new player below.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <Input
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-2 border-primary/20 text-mystic-light placeholder:text-mystic-light/50"
            />
            <div className="flex flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Add Player
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full border-primary/20 text-mystic-light hover:bg-primary/10">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}