import { GameModeProvider } from "@/contexts/GameModeContext";
import { GameContent } from "./GameContent";

export default function IndexPage() {
  return (
    <GameModeProvider>
      <GameContent />
    </GameModeProvider>
  );
}