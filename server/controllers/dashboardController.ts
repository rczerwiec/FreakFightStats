export const dashboardView = (req:any, res:any) => {
    res.render("dashboard", {
      user: req.user
    });
  };
