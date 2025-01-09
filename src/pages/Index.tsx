import { GameModeProvider } from "@/contexts/GameModeContext";
import { GameContent } from "./GameContent";
import { motion } from "framer-motion";

export default function IndexPage() {
  return (
    <GameModeProvider>
      <div className="min-h-screen bg-[#1A1F2C] relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/50 to-black/80 pointer-events-none" />
        
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 pt-12 pb-8 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-mystic-light to-accent mb-4">
            Mystic Cards
          </h1>
          <p className="text-center text-mystic-light/80 text-lg md:text-xl max-w-2xl mx-auto">
            Master the Elements, Uncover the Secrets, Triumph in Mystara
          </p>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <GameContent />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </div>
    </GameModeProvider>
  );
}