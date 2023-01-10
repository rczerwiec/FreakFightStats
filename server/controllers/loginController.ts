import { Response, Request } from "express";
import { UserModel } from "../models/User";
import { User } from "../types/types";
import bcrypt from "bcryptjs";
import passport from "passport";
// For View
export const loginView = (req: Request, res: Response) => {
  res.render("login", {});
};

export const registerUser = (req: Request, res: Response) => {

//   const { name, email, password} = req.body;
//   if (!name || !email || !password) {
//     console.log("Fill empty fields");
//   }
//   else {
//     //Validation
//     UserModel.findOne({ email: email }).then((user) => {
//       if (user) {
//         console.log("email exists");
//         res.render("register", {
//           name,
//           email,
//           password,
//         });
//       } else {
//         //Validation
//         const newUser = new UserModel({
//           name,
//           email,
//           password,
//         });
//         //Password Hashing
//         bcrypt.genSalt(10, (err: any, salt: any) =>
//           bcrypt.hash(newUser.password, salt, (err: any, hash: string) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .catch((err) => console.log(err));
//           })
//         );
//         res.json("Done!")
//       }
//     });
//   }
};

export const loginUser = (req: Request, res: Response) => {
    const { email, password } : User = req.body;
    //Required
    if (!email || !password) {
      console.log("Please fill in all the fields");
      res.render("login", {
        email,
        password,
      });
    } else {
      passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: true,
      })(req, res);
      
    }
  };