import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// User
import { User_Controller } from './user.controller';
import { User_Service } from './user.service';
import { User_Schema } from './user.model';

// Shopping cart
import { ShoppingCart_Schema } from 'src/shopping_cart/shoppingCart.model';
import { ShoppingCart_Service } from 'src/shopping_cart/shoppingCart.service';
import { ShoppingCart_Controller } from 'src/shopping_cart/shoppingCart.controller';

// Product
import { Product_Schema } from 'src/product/product.model';
import { Product_Controller } from 'src/product/product.controller';
import { Product_Service } from 'src/product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User_Schema },
      { name: 'ShoppingCart', schema: ShoppingCart_Schema },
      { name: 'Product', schema: Product_Schema },
    ]),
  ],
  controllers: [User_Controller, ShoppingCart_Controller, Product_Controller],
  providers: [User_Service, ShoppingCart_Service, Product_Service],
})
export class User_Module {}
