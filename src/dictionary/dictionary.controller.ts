import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import {
  CreateDataOptionDto,
  CreateDictionaryDto,
} from './dto/create-dictionary.dto';
import {
  UpdateDataOptionDto,
  UpdateDictionaryDto,
} from './dto/update-dictionary.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  create_dictionary(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create_dictionary(createDictionaryDto);
  }

  @Get()
  findAll() {
    return this.dictionaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ) {
    return this.dictionaryService.update(+id, updateDictionaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictionaryService.remove(+id);
  }

  @Post('create_option')
  create_option(@Body() createDto: CreateDataOptionDto) {
    return this.dictionaryService.create_option(createDto);
  }

  @Get('find_dict_List:key')
  find_dict_List(@Param('key') key: string) {
    return this.dictionaryService.find_dict_List(key);
  }

  @Get('find_dict_item:key')
  find_dict_item(@Param('key') key: number) {
    return this.dictionaryService.find_dict_item(key);
  }

  @Patch('update_data_option:id')
  update_data_option(
    @Param('id') id: string,
    @Body() updateDictionaryDto: UpdateDataOptionDto,
  ) {
    return this.dictionaryService.update_data_option(+id, updateDictionaryDto);
  }

  @Delete('remove_data_option:id')
  remove_data_option(@Param('id') id: string) {
    return this.dictionaryService.remove_data_option(+id);
  }
}
