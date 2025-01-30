import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Salon } from "./salon.model";

@ObjectType()
export class Service {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Salon)
  salon?: Salon;

  @Field(() => Int)
  salonId: number;
}
