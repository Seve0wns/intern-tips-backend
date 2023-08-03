import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryCreationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  category: string;
}
