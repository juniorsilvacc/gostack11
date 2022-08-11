import { Router } from 'express';
import { CreateAppointmentController } from '../../../modules/appointments/controllers/CreateAppointmentController';
import { ListAppointmentController } from '../../../modules/appointments/controllers/ListAppointmentsController';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const appointmentsRouter = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentController();

appointmentsRouter.post(
  '/',
  ensureAutenticated,
  createAppointmentController.handle,
);

appointmentsRouter.get(
  '/',
  ensureAutenticated,
  listAppointmentsController.handle,
);

export default appointmentsRouter;
