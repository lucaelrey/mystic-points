import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Book, Sword, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Category = "setup" | "gameplay" | "winning" | "abilities";

interface GuideCard {
  id: number;
  title: string;
  description: string;
  category: Category;
  icon: typeof Book | typeof Sword | typeof Trophy | typeof Sparkles;
}

const guideCards: GuideCard[] = [
  {
    id: 1,
    title: "Game Setup",
    description: "Begin by gathering 2-4 players. Each player starts with 5 cards and 20 life points. Shuffle the deck thoroughly before dealing.",
    category: "setup",
    icon: Book
  },
  {
    id: 2,
    title: "Basic Actions",
    description: "On your turn, draw a card and play one action. Actions include attacking, defending, or using special abilities.",
    category: "gameplay",
    icon: Sword
  },
  {
    id: 3,
    title: "Victory Conditions",
    description: "The last player standing wins! Reduce your opponents' life points to zero while protecting your own.",
    category: "winning",
    icon: Trophy
  },
  {
    id: 4,
    title: "Special Abilities",
    description: "Each card has unique abilities. Combine them strategically to create powerful combinations and overcome your opponents.",
    category: "abilities",
    icon: Sparkles
  }
];

const GameGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const categories: { value: Category | "all"; label: string }[] = [
    { value: "all", label: "All Rules" },
    { value: "setup", label: "Setup" },
    { value: "gameplay", label: "Gameplay" },
    { value: "winning", label: "Winning" },
    { value: "abilities", label: "Abilities" }
  ];

  const filteredCards = guideCards.filter(
    card => selectedCategory === "all" || card.category === selectedCategory
  );

  const toggleCard = (cardId: number) => {
    setFlippedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.value}
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
            className={cn(
              "border-primary/20 hover:bg-primary/20",
              selectedCategory === category.value && "bg-primary/20 text-primary"
            )}
          >
            <Filter className="mr-2 h-4 w-4" />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCards.map(card => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="perspective-1000"
            >
              <div
                className={cn(
                  "relative w-full h-[300px] cursor-pointer transition-transform duration-500 transform-style-3d",
                  flippedCards.includes(card.id) && "rotate-y-180"
                )}
                onClick={() => toggleCard(card.id)}
              >
                {/* Front of card */}
                <Card className="absolute w-full h-full backface-hidden glass-card p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/40 transition-colors">
                  <card.icon className="h-12 w-12 text-primary animate-float" />
                  <h3 className="text-2xl font-bold text-center text-gradient">
                    {card.title}
                  </h3>
                  <p className="text-sm text-center text-mystic-light/60">
                    Click to learn more
                  </p>
                </Card>

                {/* Back of card */}
                <Card className="absolute w-full h-full backface-hidden glass-card p-6 flex flex-col items-center justify-center gap-4 rotate-y-180 hover:border-primary/40 transition-colors">
                  <p className="text-mystic-light/80 text-center">
                    {card.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-primary/20 hover:bg-primary/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(card.id);
                    }}
                  >
                    Back to Front
                  </Button>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameGuide;