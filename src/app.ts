import express from 'express';
import carRouter from './Routes/carRoute';
import motorcycleRouter from './Routes/motorcycleRoute';

const app = express();

app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);

export default app;
