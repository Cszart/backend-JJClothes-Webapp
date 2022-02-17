import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Order
import { Order_Controller } from './order.controller';
import { Order_Service } from './order.service';
import { Order_Schema } from './order.model';

// Product
import { Product_Schema } from 'src/product/product.model';
import { Product_Controller } from 'src/product/product.controller';
import { Product_Service } from 'src/product/product.service';

// Category
import { Category_Controller } from 'src/category/category.controller';
import { Category_Schema } from 'src/category/category.model';
import { Category_Service } from 'src/category/category.service';

// Tag
import { Tag_Controller } from 'src/tag/tag.controller';
import { Tag_Schema } from 'src/tag/tag.model';
import { Tag_Service } from 'src/tag/tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: Order_Schema },
      { name: 'Product', schema: Product_Schema },
      { name: 'Category', schema: Category_Schema },
      { name: 'Tag', schema: Tag_Schema },
    ]),
  ],
  controllers: [
    Order_Controller,
    Product_Controller,
    Tag_Controller,
    Category_Controller,
  ],
  providers: [Order_Service, Product_Service, Tag_Service, Category_Service],
  exports: [Order_Service],
})
export class Order_Module {}
