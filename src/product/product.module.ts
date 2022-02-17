import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Product
import { Product_Controller } from './product.controller';
import { Product_Service } from './product.service';
import { Product_Schema } from './product.model';

// Category
import { Category_Schema } from 'src/category/category.model';
import { Category_Service } from 'src/category/category.service';
// Tags
import { Tag_Schema } from 'src/tag/tag.model';
import { Tag_Service } from 'src/tag/tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: Product_Schema },
      { name: 'Category', schema: Category_Schema },
      { name: 'Tag', schema: Tag_Schema },
    ]),
  ],
  controllers: [Product_Controller],
  providers: [Product_Service, Tag_Service, Category_Service],
})
export class Product_Module {}
