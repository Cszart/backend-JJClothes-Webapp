import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Login_DTO } from './auth.model';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class Auth_Controller {
  // Login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data: Login_DTO, @Request() req) {
    console.log(
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n login \n\n\n',
    );
    return req.user;
  }
}
