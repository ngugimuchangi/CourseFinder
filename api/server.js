import express from 'express';
import router from './routes';

const port = process.env.API_PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use(router);

app.listen(port, () => {
  console.log(`Course Finder API server listening at port ${port}`);
});
