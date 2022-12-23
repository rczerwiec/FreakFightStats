import Player from "../models/Player";

export const dashboardView = async(req:any, res:any) => {

   const players = await Player.find();

    res.render("dashboard", {
      user: req.user,
      players: players,
    });
  };

