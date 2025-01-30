import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAppointment {
  @Field()
  customerName: string;

  @Field()
  appointmentTime: Date;

  @Field(() => Int)
  salonId: number;

  @Field(() => Int)
  serviceId: number;
}

@InputType()
export class UpdateAppointment {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  customerName?: string;

  @Field({ nullable: true })
  appointmentTime?: Date;

  @Field(() => Int, { nullable: true })
  serviceId?: number;
}
