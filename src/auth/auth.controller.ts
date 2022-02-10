import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Login_DTO } from './auth.model';
import { Auth_Service } from './auth.service';
import { LocalStrategy } from './local.strategy';

@ApiTags('Auth')
@Controller('auth')
export class Auth_Controller {
  constructor(
    private localStrategy: LocalStrategy,
    private auth_Service: Auth_Service,
  ) {}

  // Login
  @Post('login')
  async login(@Body() data: Login_DTO) {
    const validated_user_info = await this.localStrategy.validate(
      data.email,
      data.password,
    );

    if (!validated_user_info._doc) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Wrong username or password',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.auth_Service.login(validated_user_info._doc);
  }
}
