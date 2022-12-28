import Player from "../models/Player";
import { Response, Request } from "express";
import passport from "passport";

export const createPlayer = (req: Request, res: Response) => {
  console.log(req.body);
  const { name, wins, loses, draws, championships, federations, lastMatch,debiut} = req.body;


  const calculateRanking =(wins: number,loses: number,draws: number, matches: number) => {
    let ranking = 1000;

    // Dla każdej wygranej dodaj 100 punktów
    ranking += 100 * wins;
  
    // Dla każdego remisu dodaj 50 punktów
    ranking += 25 * draws;
  
    // Dla każdej przegranej odejmij 100 punktów
    ranking -= 100 * loses;

    ranking += 10 * matches;
  
    return ranking;
  }


  if (req.user) {
    if (!name || !wins || !loses || !draws) {
      console.log("Wypełnij wszystkie pola");
    } else {
      const newPlayer = new Player({
        name,
        wins,
        draws,
        loses,
        championships,
        matches: (parseInt(wins) + parseInt(loses) + parseInt(draws)),
        points: calculateRanking(wins,loses,draws, (parseInt(wins) + parseInt(loses) + parseInt(draws))),
        federations: federations,
        lastMatch: lastMatch,
        debiut: debiut,
      });

      newPlayer.save();

      res.redirect('/dashboard');
    }
  } else {
    res.json("Youre not logged in!");
    res.redirect("/");
  }
};

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find();

    res.json(players);
  } catch (err) {}
};

