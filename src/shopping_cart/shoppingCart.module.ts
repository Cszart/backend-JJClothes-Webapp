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

// Category
import { Category_Controller } from 'src/category/category.controller';
import { Category_Schema } from 'src/category/category.model';
import { Category_Service } from 'src/category/category.service';

// Tag
import { Tag_Controller } from 'src/tag/tag.controller';
import { Tag_Schema } from 'src/tag/tag.model';
import { Tag_Service } from 'src/tag/tag.service';

// User
import { User_Controller } from 'src/user/user.controller';
import { User_Schema } from 'src/user/user.model';
import { User_Service } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShoppingCart', schema: ShoppingCart_Schema },
      { name: 'User', schema: User_Schema },
      { name: 'Product', schema: Product_Schema },
      { name: 'Category', schema: Category_Schema },
      { name: 'Tag', schema: Tag_Schema },
    ]),
  ],
  controllers: [
    ShoppingCart_Controller,
    User_Controller,
    Product_Controller,
    Tag_Controller,
    Category_Controller,
  ],
  providers: [
    ShoppingCart_Service,
    User_Service,
    Product_Service,
    Tag_Service,
    Category_Service,
  ],
  exports: [ShoppingCart_Service],
})
export class ShoppingCart_Module {}
