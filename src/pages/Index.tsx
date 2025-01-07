import { useState, useEffect } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { EditPointsDialog } from "@/components/EditPointsDialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";

interface PlayerPoints {
  [round: number]: number;
}

interface Player {
  id: string;
  name: string;
  points: number;
  roundPoints: PlayerPoints;
}

const MAX_ROUNDS = 5;

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [showWinner, setShowWinner] = useState(false);
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
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === selectedPlayer.id) {
            const updatedRoundPoints = {
              ...p.roundPoints,
              [currentRound]: points,
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
        description: `${points} points added to ${selectedPlayer.name} for round ${currentRound}`,
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

  const canAdvanceRound = () => {
    return players.every((player) => player.roundPoints[currentRound] !== undefined);
  };

  const advanceRound = () => {
    if (currentRound < MAX_ROUNDS && canAdvanceRound()) {
      setCurrentRound((prev) => prev + 1);
      toast({
        title: "Round advanced",
        description: `Starting round ${currentRound + 1}`,
      });
    } else if (currentRound === MAX_ROUNDS && canAdvanceRound()) {
      const winner = [...players].sort((a, b) => b.points - a.points)[0];
      setShowWinner(true);
      toast({
        title: "Game Over!",
        description: `${winner.name} is crowned as the King of Mystara!`,
      });
    }
  };

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  const winner = sortedPlayers[0];

  return (
    <div className="min-h-screen bg-mystic-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Mystara Points Tracker
          </h1>
          <p className="text-mystic-light">
            Round {currentRound} of {MAX_ROUNDS}
          </p>
        </div>

        {showWinner && winner && (
          <div className="text-center mb-8 p-8 bg-mystic-dark/50 rounded-lg border-2 border-primary animate-mystic-glow">
            <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-2">
              All hail the King of Mystara!
            </h2>
            <p className="text-2xl text-mystic-light mb-4">{winner.name}</p>
            <Sparkles className="h-8 w-8 text-primary mx-auto" />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              points={player.points}
              rank={index + 1}
              currentRound={currentRound}
              roundPoints={player.roundPoints}
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

        {players.length > 0 && currentRound <= MAX_ROUNDS && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={advanceRound}
              disabled={!canAdvanceRound()}
              className={cn(
                "px-8 py-4 text-lg",
                canAdvanceRound() ? "animate-mystic-glow" : ""
              )}
            >
              {currentRound === MAX_ROUNDS ? "End Game" : "Next Round"}
            </Button>
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