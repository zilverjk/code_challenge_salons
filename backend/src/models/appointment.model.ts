import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Salon } from "./salon.model";
import { Service } from "./service.model";

@ObjectType()
export class Appointment {
  @Field(() => Int)
  id: number;

  @Field()
  customerName: string;

  @Field()
  appointmentTime: Date;

  @Field()
  serviceName: string;

  @Field(() => Salon)
  salon?: Salon;

  @Field(() => Int)
  salonId: number;

  @Field(() => Service)
  service?: Service;

  @Field(() => Int)
  serviceId: number;
}
