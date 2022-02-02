import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Product
import { Product_Controller } from './product.controller';
import { Product_Service } from './product.service';
import { Product_Schema } from './product.model';

// Schema
import { Category_Schema } from 'src/category/category.model';
import { Tag_Schema } from 'src/tag/tag.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: Product_Schema },
      { name: 'Category', schema: Category_Schema },
      { name: 'Tag', schema: Tag_Schema },
    ]),
  ],
  controllers: [Product_Controller],
  providers: [Product_Service],
})
export class Product_Module {}
