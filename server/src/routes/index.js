import express from 'express';

import city from './city';
import state from './state'; 

const app = express();

app.use(city);
app.use(state);

export default app;