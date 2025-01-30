import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Service } from './service.model';
import { Appointment } from './appointment.model';

@ObjectType()
export class Salon {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  location: string;

  @Field(() => [Service])
  services?: Service[];

  @Field(() => [Appointment])
  appointments?: Appointment[];
}
