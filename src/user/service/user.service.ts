import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCreationDto, UpdateUserDto } from '../dto/user.dto';
import { Role } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';

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
        resolve(this.userRepository.findOneBy({ id }));
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
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
        let user = await this.userRepository.findOneBy({ id: userId });
        if (updateUser.newPassword) this.updatePassword(user, updateUser);
        user = { ...user, ...updateUser };
        await this.userRepository.save(user);
        resolve(user);
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  private updatePassword(user: UserEntity, updateUser: UpdateUserDto) {
    if (user.password === updateUser.oldPassword)
      updateUser.password = updateUser.newPassword;
    delete updateUser.newPassword;
    delete updateUser.oldPassword;
  }
}
