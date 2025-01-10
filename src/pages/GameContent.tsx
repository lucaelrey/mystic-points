import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { EditPointsDialog } from "@/components/EditPointsDialog";
import { GameHeader } from "@/components/GameHeader";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { GameControls } from "@/components/GameControls";
import { EndGameDialog } from "@/components/EndGameDialog";
import { useGameState } from "@/hooks/useGameState";

export function GameContent() {
  const {
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    isEditing,
    setIsEditing,
    currentRound,
    gameStarted,
    showWinner,
    showEndGameDialog,
    setShowEndGameDialog,
    addPlayer,
    deletePlayer,
    startGame,
    resetGame,
    handlePreviousRound,
    canAdvanceRound,
    handleAdvanceRound,
    endGame,
    resetPlayerScores,
  } = useGameState();

  // Sortiere Spieler nach Punkten (aufsteigend - niedrigste Punkte zuerst)
  const sortedPlayers = [...players].sort((a, b) => {
    const totalPointsA = Object.values(a.roundPoints).reduce((sum, points) => sum + points, 0);
    const totalPointsB = Object.values(b.roundPoints).reduce((sum, points) => sum + points, 0);
    return totalPointsA - totalPointsB;
  });
  
  const winner = sortedPlayers[0];
  const canStartGame = players.length >= 2;

  const handleStartNewGame = () => {
    resetPlayerScores();
    resetGame();
  };

  const handleNameChange = (playerId: string, newName: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, name: newName }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mystic-dark to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          currentRound={currentRound}
          maxRounds={5}
          gameStarted={gameStarted}
        />

        {!gameStarted && showWinner && winner && (
          <WinnerDisplay 
            winnerName={winner.name} 
            winnerScore={Object.values(winner.roundPoints).reduce((sum, points) => sum + points, 0)}
            onStartNewGame={handleStartNewGame}
          />
        )}

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              points={Object.values(player.roundPoints).reduce((sum, points) => sum + points, 0)}
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
              gameStarted={gameStarted}
              onNameChange={(newName) => handleNameChange(player.id, newName)}
            />
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-12 bg-mystic-dark/50 rounded-lg border border-primary/20">
            <p className="text-mystic-light/80">No players added yet.</p>
            <p className="text-mystic-light/80 mt-2">Click the + button to add players.</p>
          </div>
        )}

        <GameControls
          gameStarted={gameStarted}
          currentRound={currentRound}
          maxRounds={5}
          canAdvanceRound={canAdvanceRound()}
          onAdvanceRound={handleAdvanceRound}
          onPreviousRound={handlePreviousRound}
          onEndGame={endGame}
          onResetGame={startGame}
          canGoBack={currentRound > 1}
          canStartGame={canStartGame}
        />

        {!gameStarted && <AddPlayerDialog onAddPlayer={addPlayer} />}
        
        <AddPointsDialog
          playerName={selectedPlayer?.name ?? ""}
          open={!!selectedPlayer && !isEditing}
          onOpenChange={(open) => !open && setSelectedPlayer(null)}
          onAddPoints={(points) => {
            if (selectedPlayer) {
              const updatedPlayers = players.map((p) => {
                if (p.id === selectedPlayer.id) {
                  const updatedRoundPoints = {
                    ...p.roundPoints,
                    [currentRound]: Math.max(0, points),
                  };
                  return {
                    ...p,
                    roundPoints: updatedRoundPoints,
                  };
                }
                return p;
              });
              setSelectedPlayer(null);
              setPlayers(updatedPlayers);
            }
          }}
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
          onEditPoints={(round, points) => {
            if (selectedPlayer) {
              const updatedPlayers = players.map((p) => {
                if (p.id === selectedPlayer.id) {
                  const updatedRoundPoints = {
                    ...p.roundPoints,
                    [round]: Math.max(0, points),
                  };
                  return {
                    ...p,
                    roundPoints: updatedRoundPoints,
                  };
                }
                return p;
              });
              setSelectedPlayer(null);
              setIsEditing(false);
              setPlayers(updatedPlayers);
            }
          }}
        />

        <EndGameDialog
          open={showEndGameDialog}
          onOpenChange={setShowEndGameDialog}
          onConfirm={() => {
            setShowEndGameDialog(false);
            endGame();
          }}
        />
      </div>
    </div>
  );
}