import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';

// Auth
import { Auth_Service } from './auth.service';
import { Auth_Controller } from './auth.controller';

// User
import { User_Module } from 'src/user/user.module';

// Shopping cart
import { ShoppingCart_Module } from 'src/shopping_cart/shoppingCart.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    User_Module,
    ShoppingCart_Module,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [Auth_Controller],
  providers: [Auth_Service, LocalStrategy, JwtStrategy],
  exports: [Auth_Service, LocalStrategy],
})
export class Auth_Module {}
