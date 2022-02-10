import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';

// Auth
import { Auth_Service } from './auth.service';
import { Auth_Controller } from './auth.controller';

// User
import { User_Module } from 'src/user/user.module';
import { User_Service } from 'src/user/user.service';
import { User_Controller } from 'src/user/user.controller';
import { User_Schema } from 'src/user/user.model';

// Shopping cart
import { ShoppingCart_Module } from 'src/shopping_cart/shoppingCart.module';
import { ShoppingCart_Service } from 'src/shopping_cart/shoppingCart.service';
import { ShoppingCart_Controller } from 'src/shopping_cart/shoppingCart.controller';
import { ShoppingCart_Schema } from 'src/shopping_cart/shoppingCart.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User_Schema },
      { name: 'ShoppingCart', schema: ShoppingCart_Schema },
    ]),
    User_Module,
    ShoppingCart_Module,
    PassportModule,
  ],
  controllers: [Auth_Controller, User_Controller, ShoppingCart_Controller],
  providers: [Auth_Service, User_Service, ShoppingCart_Service, LocalStrategy],
  exports: [Auth_Service],
})
export class Auth_Module {}
