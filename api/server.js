import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import DBClient from '../utils/shared/db';
import redisClient from '../utils/shared/redis';
import errorHandler from './middleware/error';
import Validator from './middleware/validator';
import unmatchedRoutes from './middleware/unmatched';

dotenv.config();

const app = express();
const port = process.env.API_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Validator.authTokenValidator);
app.use(router);
app.use(unmatchedRoutes);
app.use(errorHandler);

DBClient.connect();
redisClient.connect();

app.listen(port, () => {
  console.log(`Course Finder API server listening at port ${port}`);
});
