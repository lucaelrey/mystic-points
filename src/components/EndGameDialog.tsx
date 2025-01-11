import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface EndGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function EndGameDialog({ open, onOpenChange, onConfirm }: EndGameDialogProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-white">End Game Early</DrawerTitle>
            <DrawerDescription className="text-white/60">
              Are you sure you want to end the game now? Final scores will be calculated based on current points.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-2 p-4">
            <Button
              onClick={onConfirm}
              className="bg-[#debe5d] hover:bg-[#debe5d]/90 text-white"
            >
              End Game
            </Button>
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="bg-transparent border border-white/10 text-white/90 hover:bg-[#debe5d]/20 hover:border-[#debe5d]/50"
              >
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}