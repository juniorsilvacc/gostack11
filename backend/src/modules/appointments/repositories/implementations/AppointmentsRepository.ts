import { Repository } from 'typeorm';
import { dataSource } from '../../../../shared/infra/connection/typeorm';
import { ICreateAppointmentDTO } from '../../dtos/ICreateAppointmentDTO';
import { Appointment } from '../../models/Appointment';
import { IAppointmentsRepository } from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = dataSource.getRepository(Appointment);
  }

  async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.repository.create({
      provider_id,
      date,
    });

    await this.repository.save(appointment);

    return appointment;
  }

  async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.repository.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.repository.find();

    return appointments;
  }
}

export { AppointmentsRepository };
