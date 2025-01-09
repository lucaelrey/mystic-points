export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
          About Mystic Cards
        </h1>
        <p className="text-mystic-light/80 text-lg">
          A journey into the mystical realm of tactical card gaming
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 rounded-lg border-2 border-primary/20 bg-mystic-dark/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">The Game</h2>
          <p className="text-mystic-light/80">
            Description about the game will go here...
          </p>
        </div>

        <div className="p-6 rounded-lg border-2 border-primary/20 bg-mystic-dark/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact</h2>
          <p className="text-mystic-light/80">
            Contact information will go here...
          </p>
        </div>
      </div>
    </div>
  );
}