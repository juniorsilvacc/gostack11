import { DataSource } from 'typeorm';
import { Appointment } from '../../../../modules/appointments/models/Appointment';
import { User } from '../../../../modules/users/models/User';
import { CreateAppointment1660152366538 } from './migrations/1660152366538-CreateAppointment';
import { CreateUser1660162713716 } from './migrations/1660162713716-CreateUser';
import { AlterTableAddColumnProviderId1660163923628 } from './migrations/1660163923628-AlterTableAddColumnProviderId';
import { AddAvatarFieldUser1660230409730 } from './migrations/1660230409730-AddAvatarFieldUser';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'gostack11',
  entities: [Appointment, User],
  migrations: [
    CreateAppointment1660152366538,
    CreateUser1660162713716,
    AlterTableAddColumnProviderId1660163923628,
    AddAvatarFieldUser1660230409730,
  ],
});
