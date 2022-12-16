import express from 'express';
import carRouter from './Routes/carRoute';

const app = express();

app.use(express.json());
app.use(carRouter);

export default app;
