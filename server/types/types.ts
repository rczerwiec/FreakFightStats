export interface Player{
    name: string;
    wins: number;
    loses: number;
    draws: number;
    federations: string,
    lastMatch: string,
    debiut: string,
    currentRank: number | undefined
    points: number | undefined
  }

export interface User{
    email: string;
    password: string;
}