import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserCreationDto, UpdateUserDto } from '../dto/user.dto';
import { ChangeRoleDto, FindUserByIdDto } from '../dto/userParam.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() user: UserCreationDto): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findById(@Param() params: FindUserByIdDto): Promise<UserEntity> {
    return await this.userService.findUser(params.id);
  }
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async changeRole(
    @Param() params: FindUserByIdDto,
    @Body() newRole: ChangeRoleDto,
  ): Promise<UserEntity> {
    return await this.userService.changeUserRole(params.id, newRole.newRole);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @Param() params: FindUserByIdDto,
    @Body() updateInfo: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUserInfo(params.id, updateInfo);
  }
}
