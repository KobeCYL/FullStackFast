import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateDataOptionDto,
  CreateDictionaryDto,
} from './dto/create-dictionary.dto';
import {
  UpdateDataOptionDto,
  UpdateDictionaryDto,
} from './dto/update-dictionary.dto';
import { Dictionary } from './entities/dictionary.entity';
import { DataOption } from './entities/dataOption.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DictionaryService {
  @InjectRepository(Dictionary)
  private dictionaryRepository: Repository<Dictionary>;

  @InjectRepository(DataOption)
  private dataOptionRepository: Repository<DataOption>;
  async create_dictionary(createDictionaryDto: CreateDictionaryDto) {
    const { name, key, desc, isSupper } = createDictionaryDto;

    const foundRes = await this.dictionaryRepository.findOneBy({ key });

    if (foundRes) {
      throw new HttpException('字典已存在', 500);
    }

    const newDictionary = new Dictionary();
    newDictionary.name = name;
    newDictionary.key = key;
    newDictionary.desc = desc;
    newDictionary.isSupper = isSupper;
    // newDictionary.dictList = dictList.map((item) => {
    //   const newDict = new DictList();
    //   newDict.value = item.value;
    //   newDict.label = item.label;
    //   newDict.description = item.description;
    //   newDict.sort = item.sort;
    //   return newDict;
    // });

    await this.dictionaryRepository.save(newDictionary);

    return await this.dictionaryRepository.findOne({ where: { key } });
  }

  async findAll() {
    return this.dictionaryRepository.find({ relations: ['dictList'] });
  }

  async findOne(id: number) {
    console.log('id', id);
    const res = await this.dictionaryRepository.findOne({
      where: { id },
      relations: ['dictList'],
    });
    console.log('res', res);
    if (!res) {
      throw new HttpException('字典不存在', 500);
    }

    return res;
  }

  async update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    const res = await this.dictionaryRepository.findOne({ where: { id } });

    if (!res) {
      throw new HttpException('字典不存在', 500);
    }
    return await this.dictionaryRepository.update(id, updateDictionaryDto);
  }

  async remove(id: number) {
    const res = await this.dictionaryRepository.findOne({ where: { id } });
    if (!res) {
      throw new HttpException('字典不存在', 500);
    }

    return await this.dictionaryRepository.delete(id);
  }

  async create_option(createDto: CreateDataOptionDto) {
    const { label, value, description, sort, relationKey } = createDto;

    const foundRes = await this.dictionaryRepository.findOneBy({
      key: relationKey,
    });

    if (!foundRes) {
      throw new HttpException('字典不存在', 500);
    }

    const newDataOption = new DataOption();
    newDataOption.label = label;
    newDataOption.value = value;
    newDataOption.description = description;
    newDataOption.sort = sort;
    newDataOption.dictionary = foundRes;
    const res = await this.dataOptionRepository.save(newDataOption);
    return res;
  }

  async find_dict_List(key: string) {
    const res = await this.dictionaryRepository.findOne({
      where: { key },
      relations: ['dictList'],
    });
    console.log('res', res);
    if (res) {
      return res.dictList;
    }
  }

  async find_dict_item(id: number) {
    const res = await this.dataOptionRepository.findOne({
      where: { id },
    });

    if (!res) {
      throw new HttpException('当前项不存在', 500);
    }

    return res;
  }

  async update_data_option(id: number, updatDto: UpdateDataOptionDto) {
    const res = await this.dataOptionRepository.findOne({ where: { id } });

    if (!res) {
      throw new HttpException('字典不存在', 500);
    }
    return await this.dataOptionRepository.update(id, updatDto);
  }

  async remove_data_option(id: number) {
    const res = await this.dataOptionRepository.findOne({ where: { id } });
    if (!res) {
      throw new HttpException('字典不存在', 500);
    }

    return await this.dictionaryRepository.delete(id);
  }
}
