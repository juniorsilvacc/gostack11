import { DataSource } from 'typeorm';
import { Appointment } from '../../../../modules/appointments/models/Appointment';
import { CreateAppointment1660152366538 } from './migrations/1660152366538-CreateAppointment';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'gostack11',
  entities: [Appointment],
  migrations: [CreateAppointment1660152366538],
});
