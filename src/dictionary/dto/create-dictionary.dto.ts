export class CreateDictionaryDto {
  name: string;
  key: string;
  desc: string;
  isSupper: boolean;
  // dictList: DictList[];
}

export class CreateDataOptionDto {
  relationKey: string;
  label: string;
  value: string;
  description: string;
  sort: number;
  // dictList: DictList[];
}
