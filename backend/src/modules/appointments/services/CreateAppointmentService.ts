import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';
import { Appointment } from '../models/Appointment';
import { startOfHour } from 'date-fns';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

class CreateAppointmentService {
  constructor(
    private readonly appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export { CreateAppointmentService };
