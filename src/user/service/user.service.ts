import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { databaseResponse } from 'src/utils/dataBankResponse';
import { Repository } from 'typeorm';
import {
  UserCreationDto,
  UpdateUserDto,
  UpdateUserPassDto,
} from '../dto/user.dto';
import { Role } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserCreationDto): Promise<UserEntity> {
    let role: number;
    return new Promise(async (resolve, reject) => {
      try {
        role =
          Role[(await this.userRepository.count()) > 0 ? 'employee' : 'root'];
        const { id } = (await this.userRepository.insert({ ...user, role }))
          .generatedMaps[0];
        resolve(new UserEntity({ id, ...user, role }));
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async findUser(id: number): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
          reject({ code: HttpStatus.NOT_FOUND, message: 'User not found.' });
        resolve(user);
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async getUserList(): Promise<UserEntity> {
    return databaseResponse(async () => await this.userRepository.find());
  }

  async changeUserRole(userId: number, newRole: string): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOneBy({ id: userId });
        user.role = Role[newRole];
        await this.userRepository.save(user);
        resolve(user);
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async updateUserInfo(
    userId: number,
    updateUser: UpdateUserDto,
  ): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.userRepository.update({ id: userId }, updateUser);
        resolve(this.userRepository.findOneBy({ id: userId }));
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async updatePassword(userId: number, passwordInfo: UpdateUserPassDto) {
    return databaseResponse(async () => {
      const user = await this.findUser(userId);
      if (passwordInfo.old_password === user.password) {
        user.password = passwordInfo.password;
        this.userRepository.save(user);
        return { message: 'Password changed succesfully' };
      } else {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: 'old_password does not match current password',
        };
      }
    });
  }
}
