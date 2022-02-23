import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User_Type } from 'src/user/user.model';

// User
import { User_Service } from 'src/user/user.service';

@Injectable()
export class Auth_Service {
  // Nombre User se definio en mongooseModule en user.module.ts
  constructor(
    private user_service: User_Service,
    private jwtService: JwtService,
  ) {}

  // FUNCION para verificar a un usuario
  async validateUser(email: string, password: string): Promise<any> {
    // Buscar el email del user
    const user_data = await this.user_service.find_byEmail(email);

    if (user_data && user_data.password === password) {
      const { password, ...result } = user_data;
      return result;
    }
    return null;
  }

  // FUNCION para loguear a un usuario y retornar un token
  async login(user: User_Type) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }
}
