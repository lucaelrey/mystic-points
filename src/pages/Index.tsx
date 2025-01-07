import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { EditPointsDialog } from "@/components/EditPointsDialog";
import { useToast } from "@/components/ui/use-toast";

interface PlayerPoints {
  [round: number]: number;
}

interface Player {
  id: string;
  name: string;
  points: number;
  roundPoints: PlayerPoints;
}

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const addPoints = (points: number) => {
    if (selectedPlayer) {
      const currentRound = Math.max(1, ...Object.keys(selectedPlayer.roundPoints).map(Number));
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === selectedPlayer.id) {
            const updatedRoundPoints = {
              ...p.roundPoints,
              [currentRound]: (p.roundPoints[currentRound] || 0) + points,
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
      toast({
        title: "Points added",
        description: `${points} points added to ${selectedPlayer.name}`,
      });
    }
  };

  const editPoints = (round: number, points: number) => {
    if (selectedPlayer) {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === selectedPlayer.id) {
            const updatedRoundPoints = {
              ...p.roundPoints,
              [round]: points,
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
      toast({
        title: "Points updated",
        description: `Points updated for ${selectedPlayer.name} in round ${round}`,
      });
    }
  };

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-mystic-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Mystara Points Tracker
          </h1>
          <p className="text-mystic-light">
            Track and manage points for your mystical journey
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
              onAddPoints={() => {
                setSelectedPlayer(player);
                setIsEditing(false);
              }}
              onEditPoints={() => {
                setSelectedPlayer(player);
                setIsEditing(true);
              }}
            />
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-12">
            <p className="text-mystic-light/80">No players added yet.</p>
            <p className="text-mystic-light/80">Click the + button to add players.</p>
          </div>
        )}

        <AddPlayerDialog onAddPlayer={addPlayer} />
        
        <AddPointsDialog
          playerName={selectedPlayer?.name ?? ""}
          open={!!selectedPlayer && !isEditing}
          onOpenChange={(open) => !open && setSelectedPlayer(null)}
          onAddPoints={addPoints}
        />

        <EditPointsDialog
          playerName={selectedPlayer?.name ?? ""}
          open={!!selectedPlayer && isEditing}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedPlayer(null);
              setIsEditing(false);
            }
          }}
          onEditPoints={editPoints}
        />
      </div>
    </div>
  );
};

export default Index;