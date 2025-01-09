import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Flame, Shield, Wand2, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = "basics" | "elements" | "combat" | "special";
type GuideCard = {
  id: number;
  title: string;
  description: string;
  category: Category;
  icon: typeof Book;
  details: string;
};

const guideCards: GuideCard[] = [
  {
    id: 1,
    title: "Game Setup",
    description: "Learn how to set up your first game",
    category: "basics",
    icon: Book,
    details: "Start by shuffling the deck and dealing 5 cards to each player. Place the Crystal of Mystara in the center."
  },
  {
    id: 2,
    title: "Elemental Powers",
    description: "Master the four elements",
    category: "elements",
    icon: Flame,
    details: "Each element has unique properties: Fire attacks, Water defends, Air mobilizes, Earth strengthens."
  },
  {
    id: 3,
    title: "Combat Basics",
    description: "Understanding attack and defense",
    category: "combat",
    icon: Sword,
    details: "Attack by playing element cards. Defend with shield cards or counter-elements."
  },
  {
    id: 4,
    title: "Special Abilities",
    description: "Unlock powerful combinations",
    category: "special",
    icon: Wand2,
    details: "Combine elements to create powerful effects. Match three of the same element for a bonus action."
  }
];

const categories = [
  { value: "all", label: "All Rules" },
  { value: "basics", label: "Basics" },
  { value: "elements", label: "Elements" },
  { value: "combat", label: "Combat" },
  { value: "special", label: "Special" }
] as const;

export default function GameGuide() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | Category>("all");
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const filteredCards = guideCards.filter(
    card => selectedCategory === "all" || card.selectedCategory === selectedCategory
  );

  const toggleCard = (cardId: number) => {
    setFlippedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
          Game Guide
        </h1>
        <p className="text-mystic-light/60 text-lg max-w-2xl mx-auto">
          Master the art of Mystic Cards with our comprehensive guide
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            variant="ghost"
            className={cn(
              "rounded-full px-6",
              selectedCategory === category.value
                ? "bg-primary text-primary-foreground"
                : "text-mystic-light/60 hover:text-mystic-light"
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {filteredCards.map(card => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn(
                "perspective-1000 cursor-pointer h-[300px]",
                "transform-style-3d transition-transform duration-500",
                flippedCards.includes(card.id) && "rotate-y-180"
              )}
              onClick={() => toggleCard(card.id)}
            >
              {/* Card Front */}
              <div className="absolute inset-0 backface-hidden">
                <div className="h-full glass-card p-6 flex flex-col items-center justify-center gap-4 animate-mystic-glow">
                  <card.icon className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">{card.title}</h3>
                  <p className="text-mystic-light/60 text-center">{card.description}</p>
                </div>
              </div>

              {/* Card Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className="h-full glass-card p-6 flex flex-col items-center justify-center gap-4">
                  <p className="text-mystic-light text-center">{card.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}