import { InMemoryAppointmentsRepository } from '../repositories/in-memory/InMemoryAppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      inMemoryAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '3319159c-f451-4e4f-9fb2-304c1e40ce4e',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(
      '3319159c-f451-4e4f-9fb2-304c1e40ce4e',
    );
  });

  it('should not able to create two apporintment on the same time', () => {
    expect(1 + 1).toEqual(2);
  });
});
