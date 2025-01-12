import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          {children || (
            <Button 
              className="w-full bg-black/50 border border-white/10 text-white/90 hover:bg-[#debe5d]/20 hover:border-[#debe5d]/50 transition-colors h-[72px] rounded-lg shadow-lg"
            >
              <Plus className="h-6 w-6 mr-2" />
              Spieler hinzufügen
            </Button>
          )}
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="mx-auto w-full max-w-sm pb-6 px-4 sm:px-6">
          <DrawerHeader className="space-y-2 pt-6">
            <DrawerTitle className="text-2xl font-bold text-white">Add New Player</DrawerTitle>
            <DrawerDescription className="text-white/60">
              Enter the name of the new player below.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <Input
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-white/10 text-white placeholder:text-white/50 focus-visible:ring-[#debe5d]/50"
              autoFocus
            />
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                type="submit" 
                className="w-full bg-[#debe5d] hover:bg-[#debe5d]/90 text-white"
              >
                Add Player
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full bg-transparent border border-white/10 text-white/90 hover:bg-[#debe5d]/20 hover:border-[#debe5d]/50">
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