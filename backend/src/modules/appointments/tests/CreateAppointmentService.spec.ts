import { AppError } from '../../../config/errors/AppError';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/InMemoryAppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';

let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      inMemoryAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '3319159c-f451-4e4f-9fb2-304c1e40ce4e',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(
      '3319159c-f451-4e4f-9fb2-304c1e40ce4e',
    );
  });

  it('should not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2022, 10, 18, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '3319159c-f451-4e4f-9fb2-304c1e40ce4e',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '3319159c-f451-4e4f-9fb2-304c1e40ce4e',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
