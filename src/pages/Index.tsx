import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { AddPointsDialog } from "@/components/AddPointsDialog";
import { EditPointsDialog } from "@/components/EditPointsDialog";
import { GameHeader } from "@/components/GameHeader";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { GameControls } from "@/components/GameControls";
import { EndGameDialog } from "@/components/EndGameDialog";
import { GameModeProvider } from "@/contexts/GameModeContext";
import { useGameState } from "@/hooks/useGameState";

function GameContent() {
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

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
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
    <div className="min-h-screen bg-[#2E294E] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          currentRound={currentRound}
          maxRounds={5}
          gameStarted={gameStarted}
        />

        {showWinner && winner && (
          <WinnerDisplay 
            winnerName={winner.name} 
            winnerScore={winner.points}
            onStartNewGame={handleStartNewGame}
          />
        )}

        {gameStarted && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary">
              Round {currentRound} of 5
            </h2>
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
              gameStarted={gameStarted}
              onNameChange={(newName) => handleNameChange(player.id, newName)}
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
                  const totalPoints = Object.values(updatedRoundPoints).reduce((a, b) => a + b, 0);
                  return {
                    ...p,
                    points: totalPoints,
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
                  const totalPoints = Object.values(updatedRoundPoints).reduce((a, b) => a + b, 0);
                  return {
                    ...p,
                    points: totalPoints,
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

export default function IndexPage() {
  return (
    <GameModeProvider>
      <GameContent />
    </GameModeProvider>
  );
}