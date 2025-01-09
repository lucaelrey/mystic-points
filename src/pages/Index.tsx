import { GameModeProvider } from "@/contexts/GameModeContext";
import { GameContent } from "./GameContent";
import { motion } from "framer-motion";
import { Book, Trophy, Wand2, Swords } from "lucide-react";
import { Card } from "@/components/ui/card";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: typeof Book;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className="w-full sm:w-64"
  >
    <Card className="h-full glass-card animate-mystic-glow">
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-sm text-mystic-light/80">{description}</p>
      </div>
    </Card>
  </motion.div>
);

const features = [
  {
    icon: Book,
    title: "Learn the Rules",
    description: "Master the fundamentals of gameplay and card mechanics"
  },
  {
    icon: Wand2,
    title: "Card Abilities",
    description: "Discover powerful magical effects and strategic combinations"
  },
  {
    icon: Trophy,
    title: "Point Tracker",
    description: "Keep score and track your progress through each game"
  },
  {
    icon: Swords,
    title: "Game Modes",
    description: "Choose between different ways to play and compete"
  }
];

export default function IndexPage() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <GameModeProvider>
      <div className="min-h-screen bg-[#1A1F2C] relative overflow-hidden">
        {/* Particle effects */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              opacity: 0
            },
            particles: {
              number: { value: 50, density: { enable: true, value_area: 800 } },
              color: { value: "#9b87f5" },
              shape: { type: "circle" },
              opacity: {
                value: 0.5,
                random: true,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              size: {
                value: 3,
                random: true,
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 0.1,
                  sync: false
                }
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" }
              }
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true
              }
            }
          }}
        />

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
          <p className="text-center text-mystic-light/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Master the Elements, Outsmart Your Rivals, and Triumph in Mystara
          </p>

          {/* Feature cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
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