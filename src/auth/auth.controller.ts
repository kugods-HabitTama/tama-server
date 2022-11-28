import { Controller, Body, Post, Res, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserPayload } from './payload/create.user.payload';
import { LoginUserPayload } from './payload/login.user.payload';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { boolean } from 'joi';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'user login' })
  @ApiOkResponse({ type: LoginUserDto })
  async login(
    @Body() loginUserPayload: LoginUserPayload,
    @Res({ passthrough: true }) res,
  ): Promise<LoginUserDto> {
    return this.authService.login(loginUserPayload, res);
  }

  @Post('register')
  @ApiOperation({ summary: 'user register' })
  @ApiOkResponse({ type: CreateUserDto })
  async register(
    @Body() createUserPayload: CreateUserPayload,
  ): Promise<CreateUserDto> {
    return this.authService.register(createUserPayload);
  }

  @Get('email/duplicate/:email')
  @ApiOperation({ summary: 'check whether an email exists' })
  @ApiOkResponse({ type: boolean })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'email',
    type: String,
  })
  async checkEmailExist(@Param('email') email): Promise<boolean> {
    return this.authService.checkEmailExist(email);
  }

  @Get('name/duplicate/:name')
  @ApiOperation({ summary: 'check whether a name exsits' })
  @ApiOkResponse({ type: boolean })
  @ApiParam({
    name: 'name',
    required: true,
    description: 'name',
    type: String,
  })
  async checkNameExist(@Param('name') name): Promise<boolean> {
    return this.authService.checkNameExist(name);
  }
}