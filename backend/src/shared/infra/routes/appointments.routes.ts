import { Router } from 'express';
import { CreateAppointmentController } from '../../../modules/appointments/controllers/CreateAppointmentController';

const appointmentsRouter = Router();

const createAppointmentController = new CreateAppointmentController();

appointmentsRouter.post('/', createAppointmentController.handle);

export default appointmentsRouter;
