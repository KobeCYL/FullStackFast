import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { createHash } from 'node:crypto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginInfo } from './entities/loginInfo.entity';
import * as moment from 'moment';
function md5(str) {
  const hash = createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
@Injectable()
export class UserService {
  private logger = new Logger();

  @Inject(JwtService)
  private jwtService: JwtService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(LoginInfo)
  private loginInfoRepository: Repository<LoginInfo>;

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (foundUser) {
      throw new HttpException('用户已存在', 1);
    }
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password || '123456');

    newUser.isAdmin = user.isAdmin || false;
    newUser.url = user.url || '';

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      this.logger.error(error, UserService);
      return '注册失败';
    }
  }

  async login(user: LoginDto, res: Response, req: Request) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    let token = null;
    const ip = req.ip;

    const userAgent = req.headers['user-agent'];
    if (foundUser) {
      const obj = {
        ...foundUser,
      };

      delete obj.password;
      token = await this.jwtService.signAsync({
        user: obj,
      });
      token = `Bearer ${token}`;
    }
    if (!foundUser) {
      throw new HttpException('用户名不存在', 0);
    }

    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('用户名或密码错误', 0);
    }
    const ipList = await this.loginInfoRepository.find({
      where: {
        ip,
        user: {
          id: foundUser.id,
        },
      },
      relations: {
        user: true,
      },
      order: {
        createTime: 'DESC',
      },
    });
    const ipInfo = ipList[0];
    const loginInfoItem = new LoginInfo();
    loginInfoItem.ip = ip;
    loginInfoItem.user = foundUser;
    const currentTime = moment().tz('Asia/Shanghai'); // 使用全局时区
    loginInfoItem.createTime = currentTime.toDate();
    loginInfoItem.userAgent = userAgent;
    if (ipInfo) {
      loginInfoItem.times = ipInfo.times + 1;
    } else {
      loginInfoItem.times = 1;
    }
    const now = new Date();
    console.log(now.toString()); // 显示本地时区的日期和时间
    console.log('currentTime', currentTime);
    console.log(now.toUTCString()); // 转换为 UTC 时间
    console.log('loginInfoItem', loginInfoItem);
    await this.loginInfoRepository.save(loginInfoItem);

    res.setHeader('token', token);

    delete foundUser.password;
    return {
      data: foundUser,
      statusCode: 1,
      msg: '登录成功',
    };
  }

  async getCurrentUser(req: Request) {
    const token = req.headers['authorization'] || '';

    const ip = req.ip;
    const list = (token as string).split(' ');
    if (list.length < 2) {
      return null;
    }
    const info = await this.jwtService.verifyAsync(list[1]);
    const user = await this.userRepository.findOne({
      where: { id: info.user.id },
      // select: [
      //   'id',
      //   'username',
      //   'isAdmin',
      //   'url',
      //   'createTime',
      //   'updateTime',
      //   'loginInfo',
      // ],
      relations: {
        loginInfo: true,
      },
      order: {
        loginInfo: {
          createTime: 'DESC',
        },
      },
    });
    let isSameIp = false;
    if (user.loginInfo.length > 0) {
      if (user.loginInfo[0].ip === ip) {
        isSameIp = true;
      }
    }
    return {
      data: {
        ...user,
        isSameIp,
      },
      statusCode: 1,
      msg: '',
    };
  }

  async getUserList(param: any) {
    const { username, url, pageSize, current } = param || {};
    const list = await this.userRepository.find({
      where: {
        username: Like(`%${username || ''}%`),
        url: Like(`%${url || ''}%`),
        // createTime: Between(startTime, endTime),
      },

      select: [
        'id',
        'username',
        'isAdmin',
        'url',
        'createTime',
        'updateTime',
        'teacherType',
      ],
      relations: {
        loginInfo: true,
      },
      order: {
        createTime: 'DESC',
      },
      skip: (current - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: list,
      statusCode: 1,
      msg: '',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      const obj = {
        id,
        ...user,
        ...updateUserDto,
      };
      if (updateUserDto.password) {
        obj.password = md5(updateUserDto.password);
      }
      await this.userRepository.save(obj);
    }

    const newUseInfo = await this.userRepository.findOneBy({ id });
    return {
      data: newUseInfo,
      statusCode: 1,
      msg: '',
    };
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return {
      statusCode: 1,
      msg: '',
    };
  }
}
