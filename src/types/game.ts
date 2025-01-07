export interface PlayerPoints {
  [round: number]: number;
}

export interface Player {
  id: string;
  name: string;
  points: number;
  roundPoints: PlayerPoints;
}