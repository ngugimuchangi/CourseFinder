import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import router from './routes';
import DBClient from '../shared/db';
import redisClient from '../shared/redis';
import errorHandler from './middleware/error';
import Validator from './middleware/validator';
import unmatchedRoutes from './middleware/unmatched';
import Logger from './middleware/logger';

dotenv.config();

const app = express();
const port = process.env.API_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressWinston.logger({
  winstonInstance: Logger.requestLogger(),
  statusLevels: true,
}));
app.use(Validator.authTokenValidator);
app.use(router);
app.use(unmatchedRoutes);
app.use(expressWinston.errorLogger({
  winstonInstance: Logger.errorLogger(),
}));
app.use(errorHandler);

DBClient.connect();
redisClient.connect();

app.listen(port, () => {
  console.log(`Course Finder API server listening at port ${port}`);
});

export default app;
