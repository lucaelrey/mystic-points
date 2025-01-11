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
              className="w-full bg-black/50 border border-white/10 text-white/90 hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors h-[72px] rounded-lg shadow-lg"
            >
              <Plus className="h-6 w-6 mr-2" />
              Spieler hinzufügen
            </Button>
          )}
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="bg-[#1A1F2C]/95 backdrop-blur-lg border-t-2 border-[#8B5CF6]/20">
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-[#8B5CF6]">Add New Player</DrawerTitle>
            <DrawerDescription className="text-[#D6BCFA]/70">
              Enter the name of the new player below.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <Input
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-2 border-[#8B5CF6]/20 text-[#D6BCFA] placeholder:text-[#D6BCFA]/50"
              autoFocus
            />
            <div className="flex flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white"
              >
                Add Player
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full border-[#8B5CF6]/20 text-[#D6BCFA] hover:bg-[#8B5CF6]/10">
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