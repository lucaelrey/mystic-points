import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { EditPointsDialog } from "@/components/EditPointsDialog";
import { GameHeader } from "@/components/GameHeader";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { GameControls } from "@/components/GameControls";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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
  const [gameStarted, setGameStarted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const { toast } = useToast();

  const addPlayer = (name: string) => {
    if (gameStarted) {
      toast({
        title: "Cannot add players",
        description: "Players can only be added before the game starts",
        variant: "destructive",
      });
      return;
    }
    
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
    if (gameStarted) {
      toast({
        title: "Cannot remove players",
        description: "Players cannot be removed during an active game",
        variant: "destructive",
      });
      return;
    }
    
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
              [currentRound]: Math.max(0, points),
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
      setSelectedPlayer(null);
      toast({
        title: "Points added",
        description: `${points} points added for round ${currentRound}`,
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
      setSelectedPlayer(null);
      setIsEditing(false);
      toast({
        title: "Points updated",
        description: `Points updated for round ${round}`,
      });
    }
  };

  const canAdvanceRound = () => {
    return players.length > 0 && players.every((player) => 
      player.roundPoints[currentRound] !== undefined
    );
  };

  const handleAdvanceRound = () => {
    if (currentRound < MAX_ROUNDS && canAdvanceRound()) {
      setCurrentRound((prev) => prev + 1);
      setGameStarted(true);
      toast({
        title: "Round advanced",
        description: `Starting round ${currentRound + 1}`,
      });
    } else if (currentRound === MAX_ROUNDS && canAdvanceRound()) {
      endGame();
    }
  };

  const endGame = () => {
    const winner = [...players].sort((a, b) => a.points - b.points)[0];
    setShowWinner(true);
    setGameStarted(false);
    toast({
      title: "Game Over!",
      description: `${winner.name} is crowned as the King of Mystara!`,
    });
  };

  const resetGame = () => {
    setPlayers([]);
    setCurrentRound(1);
    setGameStarted(false);
    setShowWinner(false);
    setSelectedPlayer(null);
    setIsEditing(false);
    toast({
      title: "Game Reset",
      description: "Start a new game by adding players",
    });
  };

  const sortedPlayers = [...players].sort((a, b) => a.points - b.points);
  const winner = sortedPlayers[0];

  return (
    <div className="min-h-screen bg-mystic-dark py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          currentRound={currentRound}
          maxRounds={MAX_ROUNDS}
          gameStarted={gameStarted}
        />

        {showWinner && winner && (
          <WinnerDisplay winnerName={winner.name} />
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

        <GameControls
          gameStarted={gameStarted}
          currentRound={currentRound}
          maxRounds={MAX_ROUNDS}
          canAdvanceRound={canAdvanceRound()}
          onAdvanceRound={handleAdvanceRound}
          onEndGame={endGame}
          onResetGame={resetGame}
        />

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