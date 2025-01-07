import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { useToast } from "@/components/ui/use-toast";

interface Player {
  id: string;
  name: string;
  points: number;
}

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { toast } = useToast();

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      points: 0,
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

  const addPoints = (points: number) => {
    if (selectedPlayer) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === selectedPlayer.id
            ? { ...p, points: p.points + points }
            : p
        )
      );
      toast({
        title: "Points added",
        description: `${points} points added to ${selectedPlayer.name}`,
      });
    }
  };

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Game Points Tracker
          </h1>
          <p className="text-gray-600">
            Track and manage points for your game players
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              points={player.points}
              rank={index + 1}
              onDelete={() => deletePlayer(player.id)}
              onAddPoints={() => setSelectedPlayer(player)}
            />
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No players added yet.</p>
            <p className="text-gray-500">Click the + button to add players.</p>
          </div>
        )}

        <AddPlayerDialog onAddPlayer={addPlayer} />
        
        <AddPointsDialog
          playerName={selectedPlayer?.name ?? ""}
          open={!!selectedPlayer}
          onOpenChange={(open) => !open && setSelectedPlayer(null)}
          onAddPoints={addPoints}
        />
      </div>
    </div>
  );
};

export default Index;