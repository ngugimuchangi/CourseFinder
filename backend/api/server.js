import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import router from './routes';
import DBClient from './utils/db';
import redisClient from './utils/redis';
import errorHandler from './middleware/error';
import authTokenValidator from './middleware/validator';
import unmatchedRoutes from './middleware/unmatched';
import logger from './middleware/logger';

dotenv.config();

const app = express();
const port = process.env.API_PORT || 1245;
const corsOptions = process.env.CORS || '*';

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressWinston.logger({
  winstonInstance: logger.accessLogger(),
  statusLevels: true,
}));
app.use(authTokenValidator);
app.use(router);
app.use(unmatchedRoutes);
app.use(expressWinston.errorLogger({
  winstonInstance: logger.errorLogger(),
}));
app.use(errorHandler);

DBClient.connect();
redisClient.connect();

app.listen(port, () => {
  console.log(`Course Finder API server listening at port ${port}`);
});

export default app;
