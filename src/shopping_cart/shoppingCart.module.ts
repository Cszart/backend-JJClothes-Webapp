import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// ShoppingCart
import { ShoppingCart_Controller } from './shoppingCart.controller';
import { ShoppingCart_Service } from './shoppingCart.service';
import { ShoppingCart_Schema } from './shoppingCart.model';

// Product
import { Product_Service } from 'src/product/product.service';
import { Product_Schema } from 'src/product/product.model';
import { Product_Controller } from 'src/product/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShoppingCart', schema: ShoppingCart_Schema },
      { name: 'Product', schema: Product_Schema },
    ]),
  ],
  controllers: [ShoppingCart_Controller, Product_Controller],
  providers: [ShoppingCart_Service, Product_Service],
})
export class ShoppingCart_Module {}
