import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bank_DTO } from './bank.model';

@Injectable()
export class Bank_Service {
  // Nombre User se definio en mongooseModule en user.module.ts
  constructor(
    @InjectModel('Bank') private readonly userModel: Model<Bank_DTO>,
  ) {}

  async decrypt(msg: string) {
    const fernet = await import('fernet');

    const SECRET_KEY = 'BxIA5nHI8_CGptA5V2yDJUhjpWKnXIwfCx1iilBFCfs=';
    const secret = new fernet.Secret(SECRET_KEY);

    const token = new fernet.Token({
      secret: secret,
      token: msg,
      ttl: 0,
    });
    return token.decode();
  }

  // FUNCION - guardar respuesta del banco
  async create_bank_response(key: string) {
    const decrypt_key = await this.decrypt(key);
    return decrypt_key;
  }
}
