import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TipCreationDto, TipUpdateDto } from '../dto/tip.dto';
import { FindTipByIdDto } from '../dto/tipParams.dto';
import { TipService } from '../service/tip.service';

@Controller('tips')
export class tipController {
  constructor(private tipService: TipService) {}

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param() params: FindTipByIdDto) {
    return await this.tipService.findTipById(params.id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll() {
    return await this.tipService.getTipList();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() newTip: TipCreationDto) {
    return await this.tipService.createTip(newTip);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(
    @Param() params: FindTipByIdDto,
    @Body() updateInfo: TipUpdateDto,
  ) {
    return await this.tipService.updateTip(params.id, updateInfo);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async destroy(@Param() params: FindTipByIdDto) {
    return await this.tipService.destroyTip(params.id);
  }
}
