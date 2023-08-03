import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class TipCreationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly title: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly authorId: number;

  @IsNotEmpty()
  @IsString()
  readonly skill: string;

  @IsNotEmpty()
  @IsNumberString()
  @Expose({ name: 'category', toClassOnly: true })
  readonly categoryId: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly video: string;
}

export class TipUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly skill: string;

  @IsOptional()
  @IsNumberString()
  @Expose({ name: 'category', toClassOnly: true })
  readonly categoryId: number;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly video: string;
}
