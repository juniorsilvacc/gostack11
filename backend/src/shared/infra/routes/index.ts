import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/api/appointments', appointmentsRouter);
routes.use('/api/users', usersRouter);

export default routes;
