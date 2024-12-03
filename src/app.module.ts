import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/entities/user.entity';
import { LoginInfo } from './user/entities/loginInfo.entity';
import * as moment from 'moment-timezone';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DictionaryModule } from './dictionary/dictionary.module';
import * as path from 'path';

const env = process.env.NODE_ENV;
const configFilePath = env === 'dev' ? 'dev.env' : '.env';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '.env'),
    }),
    UserModule,
    DictionaryModule,

    TypeOrmModule.forRootAsync({
      useFactory(configService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: configService.get('mysql_server_synchronize'),
          autoLoadEntities: true,
          entities: [User, LoginInfo],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            anthPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    // JwtModule.register({
    //   global: true,
    //   secret: 'liang',
    //   signOptions: { expiresIn: '7d' },
    // }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: { expiresIn: '7d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    moment.tz.setDefault('Asia/Shanghai');
  }
}
