import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddPlayerDialogProps {
  onAddPlayer: (name: string) => void;
}

export function AddPlayerDialog({ onAddPlayer }: AddPlayerDialogProps) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-mystic-dark/90 backdrop-blur-lg border-2 border-primary/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Add New Player</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Enter player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-2 border-primary/20 text-mystic-light placeholder:text-mystic-light/50"
          />
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Add Player
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}