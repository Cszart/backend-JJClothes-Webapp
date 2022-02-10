import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }

  async validate(payload: any) {
    // const user = await this.usersService.findUserByCriteria({
    //   id: payload.sub,
    //   email: payload.email,
    // });
    // if (user && user.length > 0)
    //   return {
    //     user: plainToClass(User, user[0]),
    //   };
    // else
    //   throw new HttpException(
    //     {
    //       statusCode: HttpStatus.UNAUTHORIZED,
    //       message: 'Bad token',
    //     },
    //     HttpStatus.UNAUTHORIZED,
    //   );

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
