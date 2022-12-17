import express from 'express';
import 'express-async-errors';
import middlewareError from './middleware/useThrowError';
import carRouter from './Routes/carRoute';
import motorcycleRouter from './Routes/motorcycleRoute';

const app = express();

app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(middlewareError);

export default app;
