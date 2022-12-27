import bcrypt from "bcryptjs"
import LocalStrategy from "passport-local"
import { User } from "../models/User";
//Load model

export const loginCheck = (passport:any) => {
  passport.use(
    new LocalStrategy.Strategy({ usernameField: "email" }, (email:any, password:any, done) => {
      //Check customer
      User.findOne({ email: email })
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
        .catch((error) => console.log(error));
    })
  );
  passport.serializeUser((user:any, done:any) => {
    done(null, user.id);
  });
  passport.deserializeUser((id:any, done:any) => {
    User.findById(id, (error:any, user:any) => {
      done(error, user);
    });
  });
};
