import { Min, Max, IsNotEmpty, IsNumber } from "class-validator";
import IOrder from "../orders.types";

export class CreateOrderValidationSchema implements IOrder {
  @IsNotEmpty()
  product_id!: string;

  @Min(1)
  quantities!: number;

  @IsNumber()
  @Max(1000_000)
  total_price!: number;
}
