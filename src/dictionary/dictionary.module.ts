import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { DataOption } from './entities/dataOption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, DataOption])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
