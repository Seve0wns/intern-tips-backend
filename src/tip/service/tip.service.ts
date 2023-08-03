import { Inject, Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/service/category.service';
import { UserService } from 'src/user/service/user.service';
import { databaseResponse } from 'src/utils/dataBankResponse';
import { Repository } from 'typeorm';
import { TipCreationDto, TipUpdateDto } from '../dto/tip.dto';
import { TipEntity } from '../entity/tip.entity';

@Injectable()
export class TipService {
  constructor(
    @Inject('TIP_REPOSITORY')
    private readonly tipRepository: Repository<TipEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createTip(tip: TipCreationDto): Promise<TipEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { categoryId, authorId, ...newTip } = tip;
        const category = await this.categoryService.findCategoryById(
          categoryId,
        );
        const author = await this.userService.findUser(authorId);
        const createdTip = this.tipRepository.create({
          ...newTip,
        });
        createdTip.category = category;
        createdTip.author = author;
        await this.tipRepository.save(createdTip);
        resolve(createdTip);
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async destroyTip(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.tipRepository.delete(id);
        resolve('Tip deleted.');
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async updateTip(id: number, updateInfo: TipUpdateDto): Promise<TipEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { categoryId, ...updateTip } = updateInfo;
        const category = await this.categoryService.findCategoryById(
          categoryId,
        );
        let tip = await this.tipRepository.findOne({
          select: { author: { id: true, username: true } },
          where: { id },
        });
        tip = { ...tip, ...updateTip, category };
        this.tipRepository.save(tip);
        resolve(tip);
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async findTipById(id: number): Promise<TipEntity> {
    return databaseResponse(async () => {
      return await this.tipRepository.findOne({
        where: { id },
        relations: { author: true },
        select: { author: { id: true, username: true } },
      });
    });
  }

  async getTipList(): Promise<TipEntity[]> {
    return databaseResponse(async () => {
      const response = await this.tipRepository.find({
        select: { author: { id: true, username: true } },
        relations: { author: true },
      });
      return response;
    });
  }
}
