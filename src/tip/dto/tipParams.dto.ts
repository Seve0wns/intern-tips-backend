import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindTipByIdDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
