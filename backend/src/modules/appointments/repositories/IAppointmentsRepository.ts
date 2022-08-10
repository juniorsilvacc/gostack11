import { ICreateAppointmentDTO } from '../dtos/ICreateAppointmentDTO';
import { Appointment } from '../models/Appointment';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | null>;
}

export { IAppointmentsRepository };
