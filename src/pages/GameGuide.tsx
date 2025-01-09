import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Crown, Sparkles, Sword, Shield, Scroll } from "lucide-react";
import { motion } from "framer-motion";

export default function GameGuide() {
  const [activeSection, setActiveSection] = useState("setup");

  return (
    <div className="min-h-screen bg-gradient-to-b from-mystic-dark to-secondary relative overflow-hidden">
      {/* Particle effect overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-pulse"></div>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-mystic-glow">
            Mystic Cards Guide
          </h1>
          <p className="text-xl md:text-2xl text-mystic-light/80 max-w-2xl mx-auto">
            Master the Elements, Uncover the Secrets, Triumph in Mystara
          </p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-10"></div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Quick Start Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 p-8 rounded-xl border border-primary/20 bg-mystic-dark/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-3xl font-bold text-primary">Quick Start Guide</h2>
          </div>
          <p className="text-lg text-mystic-light/80">
            Begin your mystical journey with these simple steps...
          </p>
        </motion.section>

        {/* Rules Sections */}
        <Accordion
          type="single"
          collapsible
          value={activeSection}
          onValueChange={setActiveSection}
          className="space-y-4"
        >
          <AccordionItem value="setup" className="border-primary/20 bg-mystic-dark/40 backdrop-blur-sm rounded-lg px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-primary">Game Setup</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-mystic-light/80 space-y-4">
              <p>Prepare for your mystical journey with these initial steps:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Gather 2-4 players</li>
                <li>Shuffle the deck thoroughly</li>
                <li>Deal 5 cards to each player</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gameplay" className="border-primary/20 bg-mystic-dark/40 backdrop-blur-sm rounded-lg px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Sword className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-primary">Gameplay Rules</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-mystic-light/80 space-y-4">
              <p>Master these core gameplay mechanics:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Take turns clockwise</li>
                <li>Draw one card at the start of your turn</li>
                <li>Play cards to gain points or affect other players</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="abilities" className="border-primary/20 bg-mystic-dark/40 backdrop-blur-sm rounded-lg px-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Scroll className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-primary">Card Abilities</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-mystic-light/80 space-y-4">
              <p>Discover the unique powers of each card:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Card examples will go here */}
                <div className="p-4 rounded-lg border border-primary/20 bg-mystic-dark/60">
                  <h4 className="text-lg font-semibold text-primary mb-2">Fire Crystal</h4>
                  <p>Unleash devastating damage to your opponents.</p>
                </div>
                <div className="p-4 rounded-lg border border-primary/20 bg-mystic-dark/60">
                  <h4 className="text-lg font-semibold text-primary mb-2">Water Shield</h4>
                  <p>Protect yourself from incoming attacks.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Video Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-xl border border-primary/20 bg-mystic-dark/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-3xl font-bold text-primary">How to Play</h2>
          </div>
          <div className="aspect-video rounded-lg bg-black/50 flex items-center justify-center">
            <p className="text-mystic-light/60">Video guide coming soon...</p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}