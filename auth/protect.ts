export const protectRoute = (req:any, res:any, next:any) =>{
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('Please log in to continue');
    res.redirect('/login');
  }
 export const allowIf = (req:any, res:any, next:any) =>{
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
