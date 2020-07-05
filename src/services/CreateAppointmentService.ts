import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositrories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const usersRepository = getRepository(User);

    const provider = await usersRepository.findOne(provider_id);

    if (!provider) {
      throw new AppError('Invalid provider');
    }

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This time is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
