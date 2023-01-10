import PlayeModelr from "../models/Player";
import { Player } from "../types/types";

export const dashboardView = async (req: any, res: any) => {
  const players = await PlayeModelr.find();

  res.render("dashboard", {
    user: req.user,
    players: players,
  });
};

export const getPlayer = async (req: any, res: any) => {
  console.log(req.params.playerId);
  try {
    const player = await PlayeModelr.findById(req.params.playerId);
    res.render("playerCard", {
      player: player,
    });
  } catch (err) {}
};

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

export const patchPlayer = async (req: any, res: any) => {
  const { name, wins, loses, draws, points, federations, lastMatch,debiut, currentRank}: Player = req.body;

  if (req.user) {
    if (!name || !wins || !loses || !draws) {
      console.log("Wypełnij wszystkie pola");
    } else {

      PlayeModelr.findByIdAndUpdate(
        req.params.playerId,
        {
          $set: {
            name: name,
            wins: wins,
            loses: loses,
            draws: draws,
            matches: (Number(wins) + Number(loses) + Number(draws)),
            points: calculateRanking(wins, loses, draws, (Number(wins) + Number(loses) + Number(draws))),
            federations: federations,
            lastMatch: lastMatch,
            debiut: debiut,
            lastRank: currentRank,
          },
        },
        { new: true },
        (err, model) => {
          if (err) {
            console.error(err);
          } else {
            console.log(model);
          }
        }
      );
      console.log("Pomyślnie zaaktualizowano");
      res.redirect("/dashboard");
    }
  } else {
    res.json("Youre not logged in!");
    res.redirect("/");
  }
};
