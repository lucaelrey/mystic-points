import { Player } from "@/types/game";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface WinnerDisplayProps {
  players: Player[];
}

const calculateTotalPoints = (roundPoints: { [key: number]: number }) => {
  return Object.values(roundPoints).reduce((sum, points) => sum + points, 0);
};

export function WinnerDisplay({ players }: WinnerDisplayProps) {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        origin: { x: randomInRange(0.3, 0.7), y: randomInRange(0.3, 0.7) },
        colors: ['#8B5CF6', '#D6BCFA', '#7E69AB'],
        spread: 80,
        decay: 0.95,
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const sortedPlayers = [...players].sort((a, b) => {
    const totalPointsA = calculateTotalPoints(a.roundPoints);
    const totalPointsB = calculateTotalPoints(b.roundPoints);
    return totalPointsA - totalPointsB;
  });

  const winner = sortedPlayers[0];

  if (!winner) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 w-full max-w-2xl mx-auto p-6"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-violet-400">
          🎉 Game Over! 🎉
        </h2>
        <p className="text-xl text-white/80">
          {winner.name} wins with {calculateTotalPoints(winner.roundPoints)} points!
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-violet-300">Final Standings:</h3>
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/50 backdrop-blur-lg border border-violet-500/20 rounded-lg p-4 shadow-lg hover:border-violet-500/50 transition-all"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {index + 1}. {player.name}
                </h3>
                <span className="text-lg font-semibold text-violet-300">
                  Total: {calculateTotalPoints(player.roundPoints)} Points
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(player.roundPoints).map(([round, points]) => (
                  <p key={round} className="text-sm text-white/60">
                    Round {round}: {points} Points
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}