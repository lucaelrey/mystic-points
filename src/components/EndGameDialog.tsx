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
      <DrawerContent className="bg-[#1A1F2C]/95 backdrop-blur-lg border-t-2 border-[#8B5CF6]/20">
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-[#8B5CF6]">End Game Early</DrawerTitle>
            <DrawerDescription className="text-[#D6BCFA]/70">
              Are you sure you want to end the game now? Final scores will be calculated based on current points.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-2 p-4">
            <Button
              onClick={onConfirm}
              className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white"
            >
              End Game
            </Button>
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-[#8B5CF6]/20 text-[#D6BCFA] hover:bg-[#8B5CF6]/10"
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