import Express, { Response, Request} from "express"
import LoginRouter from "./routes/login";
import PlayerRouter from "./routes/player";
import mongoose from "mongoose";
import 'dotenv/config';
import { loginCheck } from "../auth/passport";
import passport from "passport";
import session from "express-session";
loginCheck(passport);


const app = Express();
const db = process.env.MONGODB;
const port = 5000;

mongoose.connect(db).catch(
  error => console.log(error)).then( () => {
      console.log("Connected with db!");
  });

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));


app.use(passport.initialize());
app.use(passport.session());


app.use('/', LoginRouter);
app.use('/player',PlayerRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is working on localhost:${port}`)
})