import { Appointment } from '../models/Appointment';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

class ListAppointmentService {
  constructor(
    private readonly appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAll();

    return appointments;
  }
}

export { ListAppointmentService };
