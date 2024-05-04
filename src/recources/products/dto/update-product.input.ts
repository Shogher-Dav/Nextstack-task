import { IsOptional, Length } from "class-validator";
import { CreateProductValidationSchema } from "./create-product.input";

export class UpdateProductValidationSchema extends CreateProductValidationSchema {
  @Length(3, 50)
  @IsOptional()
  name!: string;
}
