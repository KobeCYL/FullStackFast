import { PartialType } from '@nestjs/mapped-types';
import {
  CreateDataOptionDto,
  CreateDictionaryDto,
} from './create-dictionary.dto';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {}
export class UpdateDataOptionDto extends PartialType(CreateDataOptionDto) {}
