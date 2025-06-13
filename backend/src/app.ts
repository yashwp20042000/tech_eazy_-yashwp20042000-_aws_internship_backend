
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';
import './config/passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(morgan('dev'));

app.use('/api', routes);
app.use(errorMiddleware);

export default app;
