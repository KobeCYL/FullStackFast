import { Module } from '@nestjs/common';
import { DifyService } from './dify.service';
import { DifyController } from './dify.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 如果你想在其他模块中也能使用这些配置
      isGlobal: true,
    }),
  ],
  controllers: [DifyController],
  providers: [DifyService],
  exports: [DifyService], // 导出 DifyService 以便其他模块可以使用
})
export class DifyModule {}