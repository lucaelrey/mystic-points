import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GameGuide() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
          Mystic Cards Guide
        </h1>
        <p className="text-mystic-light/80 text-lg">
          Master the art of tactical memory gameplay
        </p>
      </header>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="setup" className="border-primary/20 bg-mystic-dark/50 rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary/80">
            Game Setup
          </AccordionTrigger>
          <AccordionContent className="text-mystic-light/80 space-y-2">
            <p>Setup instructions will go here...</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gameplay" className="border-primary/20 bg-mystic-dark/50 rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary/80">
            Gameplay Rules
          </AccordionTrigger>
          <AccordionContent className="text-mystic-light/80 space-y-2">
            <p>Gameplay rules will go here...</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="abilities" className="border-primary/20 bg-mystic-dark/50 rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary/80">
            Card Abilities
          </AccordionTrigger>
          <AccordionContent className="text-mystic-light/80 space-y-2">
            <p>Card abilities will go here...</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12 p-6 rounded-lg border-2 border-primary/20 bg-mystic-dark/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-primary mb-4">How to Play Video</h2>
        <div className="aspect-video rounded-lg bg-black/50 flex items-center justify-center">
          <p className="text-mystic-light/60">Video content coming soon...</p>
        </div>
      </div>
    </div>
  );
}