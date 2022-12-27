import Player from "../models/Player";
import { Response, Request } from "express";
import passport from "passport";

export const createPlayer = (req: Request, res: Response) => {
  console.log(req.body);
  const { name, wins, loses, draws, championships } = req.body;

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

export const getPlayer = async (req: Request, res: Response) => {
  try{
    const player = await Player.findById({id: req.params.playerId})

    res.json(player);
  }
  catch(err){
    
  }
}
