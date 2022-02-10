import { Injectable } from '@nestjs/common';

// User
import { User_Service } from 'src/user/user.service';

@Injectable()
export class Auth_Service {
  // Nombre User se definio en mongooseModule en user.module.ts
  constructor(private user_service: User_Service) {}

  // FUNCION para verificar a un usuario
  async validateUser(email: string, password: string): Promise<any> {
    // Buscar el email del user
    const user_data = await this.user_service.find_byEmail(email);
    if (user_data && user_data.password == password) {
      return user_data;
    }
    return null;
  }
}
