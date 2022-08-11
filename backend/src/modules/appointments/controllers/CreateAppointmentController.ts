import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { AppointmentsRepository } from '../repositories/implementations/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';

class CreateAppointmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentRepository = new AppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }
}

export { CreateAppointmentController };
