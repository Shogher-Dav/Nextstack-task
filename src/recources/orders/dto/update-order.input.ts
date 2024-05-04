import { CreateOrderValidationSchema } from "./create-order.input";

export class UpdateProductValidationSchema extends CreateOrderValidationSchema {
  product_id!: string;
}
