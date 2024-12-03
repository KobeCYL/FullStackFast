import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginGuard } from 'src/login.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({
      passthrough: true,
    })
    res: Response,
    @Req() req: Request,
  ) {
    return this.userService.login(user, res, req);
  }

  @Post('register')
  register(@Body(ValidationPipe) user: RegisterDto) {
    return this.userService.register(user);
  }

  @Post()
  create(@Body(ValidationPipe) user: RegisterDto) {
    return this.userService.register(user);
  }

  @Get('currentUser')
  currentUser(@Req() request: Request) {
    return this.userService.getCurrentUser(request);
  }

  @Get()
  @UseGuards(LoginGuard)
  getUserList(@Req() req: Request, @Query() query: any) {
    return this.userService.getUserList(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
