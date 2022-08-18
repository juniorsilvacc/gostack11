import { ICreateAppointmentDTO } from '../../dtos/ICreateAppointmentDTO';
import { Appointment } from '../../models/Appointment';
import { IAppointmentsRepository } from '../IAppointmentsRepository';
import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

class InMemoryAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = this.appointments;

    return appointments;
  }
}

export { InMemoryAppointmentsRepository };
