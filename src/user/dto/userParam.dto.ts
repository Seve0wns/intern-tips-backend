import { IsIn, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class FindUserByIdDto {
  @IsNumberString()
  readonly id: number;
}
export class ChangeRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['manager', 'employee'])
  readonly newRole: string;
}
