import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import passport from "passport"
import helmet from "helmet";

// ROUTES imports
import appRoutes from './routes/index';

//
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

appRoutes.setUp(app);

export default app;
