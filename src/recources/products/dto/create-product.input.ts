import {
  Length,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from "class-validator";
import IProduct from "../products.types";

export class CreateProductValidationSchema implements IProduct {
  @Length(3, 50)
  @IsNotEmpty()
  name!: string;

  @Length(0, 300)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Max(1000_000)
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  stock!: number;
}
