import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { sequelize } from '../models';

import route from './routes/index';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', route);

app.get('/', (req, res) => {
  res.send({ message: 'You are welcome to Population Management System (PMS)' });
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'You route does not exist'
  });
});

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}!`),
    );
  });
}

export default app;
