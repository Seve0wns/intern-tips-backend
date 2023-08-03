import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CategoryDeleteDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly id: number;
}
