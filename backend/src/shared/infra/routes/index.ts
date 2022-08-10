import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/api/appointments', appointmentsRouter);

export default routes;
