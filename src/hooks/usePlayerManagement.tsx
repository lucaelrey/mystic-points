import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Player } from "@/types/game";

export function usePlayerManagement(
  initialPlayers: Player[] = [], 
  onPlayersChange?: (players: Player[]) => void
) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { toast } = useToast();

  const updatePlayers = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    onPlayersChange?.(newPlayers);
  };

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      points: 0,
      roundPoints: {},
    };
    updatePlayers([...players, newPlayer]);
    toast({
      title: "Player added",
      description: `${name} has been added to the game`,
    });
  };

  const deletePlayer = (id: string) => {
    updatePlayers(players.filter((p) => p.id !== id));
    toast({
      title: "Player removed",
      description: "Player has been removed from the game",
    });
  };

  const updatePlayerPoints = (playerId: string, round: number, points: number) => {
    updatePlayers(
      players.map((p) => {
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
    updatePlayers(
      players.map((p) => ({
        ...p,
        points: 0,
        roundPoints: {},
      }))
    );
  };

  return {
    players,
    setPlayers: updatePlayers,
    selectedPlayer,
    setSelectedPlayer,
    addPlayer,
    deletePlayer,
    updatePlayerPoints,
    resetPlayerScores,
  };
}