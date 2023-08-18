import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwtAuth.guard';
import {
  UserCreationDto,
  UpdateUserDto,
  UpdateUserPassDto,
} from '../dto/user.dto';
import { ChangeRoleDto, FindUserByIdDto } from '../dto/userParam.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(@Req() req): Promise<UserEntity> {
    if (req.user?.role == 'manager' || req.user?.role == 'root') {
      return await this.userService.getUserList();
    } else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(
    @Param() params: FindUserByIdDto,
    @Req() req,
  ): Promise<UserEntity> {
    if (req.user?.id != params.id && req.user?.role === 'employee') {
      throw new UnauthorizedException();
    }
    return await this.userService.findUser(params.id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() user: UserCreationDto): Promise<UserEntity> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async changeRole(
    @Param() params: FindUserByIdDto,
    @Body() newRole: ChangeRoleDto,
    @Req() req,
  ): Promise<UserEntity> {
    if (req.user?.role == 'root') {
      return await this.userService.changeUserRole(params.id, newRole.newRole);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @Param() params: FindUserByIdDto,
    @Body() updateInfo: UpdateUserDto,
    @Req() req,
  ): Promise<UserEntity> {
    if (params.id == req.user?.id) {
      return await this.userService.updateUserInfo(params.id, updateInfo);
    }
  }

  @Patch(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  public async updatePassword(
    @Param() params: FindUserByIdDto,
    @Body() passwordInfo: UpdateUserPassDto,
    @Req() req,
  ) {
    if (params.id == req.user?.id) {
      return await this.userService.updatePassword(params.id, passwordInfo);
    }
  }
}
