import Player from "../models/Player";

export const dashboardView = async(req:any, res:any) => {

   const players = await Player.find();

    res.render("dashboard", {
      user: req.user,
      players: players,
    });
  };

  export const getPlayer = async (req: any, res: any) => {
    console.log(req.params.playerId);
    try{
      const player = await Player.findById(req.params.playerId);
      res.render("playerCard", {
        player: player,
      });
    }
    catch(err){
      
    }
  }

  export const patchPlayer = async (req:any, res:any) => {
    const { name, wins, loses, draws} = req.body;

    if (req.user) {
      if (!name || !wins || !loses || !draws) {
        console.log("Wypełnij wszystkie pola");
      } else {
        Player.findByIdAndUpdate(req.params.playerId, { $set: { name: name, wins: wins, loses:loses, draws:draws } }, { new: true }, (err, model) => {
          if (err) {
            console.error(err);
          } else {
            console.log(model);
          }
        });
        console.log("Pomyślnie zaaktualizowano")
        res.redirect('/dashboard');
      }
    } else {
      res.json("Youre not logged in!");
      res.redirect("/");
    }
  }
  

