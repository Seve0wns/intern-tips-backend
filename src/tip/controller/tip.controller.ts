import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwtAuth.guard';
import { TipCreationDto, TipUpdateDto } from '../dto/tip.dto';
import { FindTipByIdDto } from '../dto/tipParams.dto';
import { TipService } from '../service/tip.service';

@UseGuards(JwtAuthGuard)
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
    @Req() req,
  ) {
    return await this.tipService.updateTip(params.id, updateInfo, req.user);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async destroy(@Param() params: FindTipByIdDto, @Req() req) {
    return await this.tipService.destroyTip(params.id, req.user);
  }
}
