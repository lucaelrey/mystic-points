import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { EditPointsDialog } from "@/components/EditPointsDialog";
import { GameHeader } from "@/components/GameHeader";
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
    updatePlayerPoints,
  } = useGameState();

  const calculateTotalPoints = (roundPoints: { [key: number]: number }) => {
    return Object.values(roundPoints).reduce((sum, points) => sum + points, 0);
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const totalPointsA = calculateTotalPoints(a.roundPoints);
    const totalPointsB = calculateTotalPoints(b.roundPoints);
    return totalPointsA - totalPointsB;
  });

  return (
    <div className="min-h-screen bg-[#121212]/0 py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          currentRound={currentRound}
          maxRounds={5}
          gameStarted={gameStarted}
        />

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              points={calculateTotalPoints(player.roundPoints)}
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
              onNameChange={(newName) => {
                setPlayers(players.map(p =>
                  p.id === player.id ? { ...p, name: newName } : p
                ));
              }}
            />
          ))}
        </div>

        {players.length === 0 && (
          <AddPlayerDialog onAddPlayer={addPlayer}>
            <div className="text-center py-12 backdrop-blur-lg rounded-xl border border-[#debe5d]/20 shadow-lg hover:border-[#debe5d]/50 transition-all cursor-pointer">
              <p className="text-violet-200/80 mb-2">Noch keine Spieler vorhanden</p>
              <p className="text-violet-200/80">Hier klicken um Spieler hinzuzufügen</p>
            </div>
          </AddPlayerDialog>
        )}

        {players.length > 0 && !gameStarted && <AddPlayerDialog onAddPlayer={addPlayer} />}

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
          canStartGame={players.length >= 2}
        />
        
        <AddPointsDialog
          playerName={selectedPlayer?.name ?? ""}
          open={!!selectedPlayer && !isEditing}
          onOpenChange={(open) => !open && setSelectedPlayer(null)}
          onAddPoints={(points) => {
            if (selectedPlayer) {
              updatePlayerPoints(selectedPlayer.id, currentRound, points);
              setSelectedPlayer(null);
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
              updatePlayerPoints(selectedPlayer.id, round, points);
              setSelectedPlayer(null);
              setIsEditing(false);
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