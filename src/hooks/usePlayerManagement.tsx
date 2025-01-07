import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Player } from "@/types/game";

export function usePlayerManagement() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { toast } = useToast();

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      points: 0,
      roundPoints: {},
    };
    setPlayers((prev) => [...prev, newPlayer]);
    toast({
      title: "Player added",
      description: `${name} has been added to the game`,
    });
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Player removed",
      description: "Player has been removed from the game",
    });
  };

  const updatePlayerPoints = (playerId: string, round: number, points: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => {
        if (p.id === playerId) {
          const updatedRoundPoints = {
            ...p.roundPoints,
            [round]: Math.max(0, points),
          };
          const totalPoints = Object.values(updatedRoundPoints).reduce((a, b) => a + b, 0);
          return {
            ...p,
            points: totalPoints,
            roundPoints: updatedRoundPoints,
          };
        }
        return p;
      })
    );
  };

  const resetPlayerScores = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => ({
        ...p,
        points: 0,
        roundPoints: {},
      }))
    );
  };

  return {
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    addPlayer,
    deletePlayer,
    updatePlayerPoints,
    resetPlayerScores,
  };
}