import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { Appointment } from './models/appointment.model';
import { CreateAppointment, UpdateAppointment } from './dto/appointment.dto';

@Resolver(() => Appointment)
export class AppResolver {
  constructor(private prisma: PrismaClient) {}

  @Query(() => [Appointment])
  async appointments() {
    return this.prisma.appointment.findMany({
      include: {
        salon: true,
        service: true,
      },
    });
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('input') input: CreateAppointment,
  ) {
    return this.prisma.appointment.create({
      data: input,
      include: {
        salon: true,
        service: true,
      },
    });
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('input') input: UpdateAppointment,
  ) {
    const { id, ...data } = input;
    return this.prisma.appointment.update({
      where: { id },
      data,
      include: {
        salon: true,
        service: true,
      },
    });
  }

  @Mutation(() => Appointment)
  async deleteAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.appointment.delete({
      where: { id },
      include: {
        salon: true,
        service: true,
      },
    });
  }
}

