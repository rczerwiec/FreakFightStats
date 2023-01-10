import PlayerModel from "../models/Player";
import { Response, Request } from "express";
import { Player } from "../types/types";

export const createPlayer = (req: Request, res: Response) => {

  const { name, wins, loses, draws, federations, lastMatch,debiut}: Player = req.body;


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
      
      const newPlayer = new PlayerModel({
        name,
        wins,
        draws,
        loses,
        matches: (Number(wins) + Number(loses) + Number(draws)),
        points: calculateRanking(wins, loses, draws, (Number(wins) + Number(loses) + Number(draws))),
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
    const players = await PlayerModel.find();
 
    //console.log(players);
    players.sort((a:any, b:any) => {

        return ((a.points - b.points) * -1);
    });

    players.map((player, index) => {
      let rankDif : number;  
      if(player.lastRank === index+1){
          rankDif = 0;
        }
        else{
          rankDif = player.lastRank - (index+1)
        }
      

        PlayerModel.findOneAndUpdate(player._id,{$set: {currentRank: index+1, rankDif:rankDif, lastRank:player.lastRank}}, { new: true },
          (err, model) => {
            if (err) {
              //console.error(err);
            } else {
              //console.log(model);
            }
          })
    })
    const sortedPlayers = await PlayerModel.find();

    //console.log(sortedPlayers);
    res.json(sortedPlayers);
  } catch (err) {
    console.log(err)
  }
};

