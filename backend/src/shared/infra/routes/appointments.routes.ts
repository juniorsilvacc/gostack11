import { Router } from 'express';
import { CreateAppointmentController } from '../../../modules/appointments/controllers/CreateAppointmentController';
import { ListAppointmentController } from '../../../modules/appointments/controllers/ListAppointmentsController';

const appointmentsRouter = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentController();

appointmentsRouter.post('/', createAppointmentController.handle);
appointmentsRouter.get('/', listAppointmentsController.handle);

export default appointmentsRouter;
