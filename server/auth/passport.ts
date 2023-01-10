import bcrypt from "bcryptjs"
import { PassportStatic } from "passport";
import LocalStrategy from "passport-local"
import { UserModel } from "../models/User";
//Load model

export const loginCheck = (passport:PassportStatic) => {
  passport.use(
    new LocalStrategy.Strategy({ usernameField: "email" }, (email:any, password:any, done) => {
      //Check customer
      UserModel.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("wrong email");
            return done(null);
          }
          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done(null);
            }
          });
        })
        .catch((error: string) => console.log(error));
    })
  );
  passport.serializeUser((user:any, done:any) => {
    done(null, user.id);
  });
  passport.deserializeUser((id:any, done:any) => {
    UserModel.findById(id, (error:string, user:any) => {
      done(error, user);
    });
  });
};
