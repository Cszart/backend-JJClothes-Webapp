import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Order
import { Order_Controller } from './order.controller';
import { Order_Service } from './order.service';
import { Order_Schema } from './order.model';

// Product
import { Product_Service } from 'src/product/product.service';
import { Product_Schema } from 'src/product/product.model';
import { Product_Controller } from 'src/product/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: Order_Schema },
      { name: 'Product', schema: Product_Schema },
    ]),
  ],
  controllers: [Order_Controller, Product_Controller],
  providers: [Order_Service, Product_Service],
})
export class Order_Module {}
