import { Request, Response } from 'express';
import { AppointmentsRepository } from '../repositories/implementations/AppointmentsRepository';
import { ListAppointmentService } from '../services/ListAppointmentsService';

class ListAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const appointmentRepository = new AppointmentsRepository();
    const listAppointmentsService = new ListAppointmentService(
      appointmentRepository,
    );

    const appointments = await listAppointmentsService.execute();

    return response.status(200).json(appointments);
  }
}

export { ListAppointmentController };
