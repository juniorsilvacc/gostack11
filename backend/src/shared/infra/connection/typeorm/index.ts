import { DataSource } from 'typeorm';
import { Appointment } from '../../../../modules/appointments/models/Appointment';
import { User } from '../../../../modules/users/models/User';
import { CreateUser1660152118553 } from './migrations/1660152118553-CreateUser';
import { CreateAppointment1660152366538 } from './migrations/1660152366538-CreateAppointment';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'gostack11',
  entities: [User, Appointment],
  migrations: [CreateUser1660152118553, CreateAppointment1660152366538],
});
