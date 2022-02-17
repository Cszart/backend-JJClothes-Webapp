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

// tag
import { Category_Schema } from 'src/category/category.model';
import { Category_Controller } from 'src/category/category.controller';
import { Category_Service } from 'src/category/category.service';

// cateogry
import { Tag_Schema } from 'src/tag/tag.model';
import { Tag_Controller } from 'src/tag/tag.controller';
import { Tag_Service } from 'src/tag/tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User_Schema },
      { name: 'ShoppingCart', schema: ShoppingCart_Schema },
      { name: 'Product', schema: Product_Schema },
      { name: 'Category', schema: Category_Schema },
      { name: 'Tag', schema: Tag_Schema },
    ]),
  ],
  controllers: [
    User_Controller,
    ShoppingCart_Controller,
    Product_Controller,
    Tag_Controller,
    Category_Controller,
  ],
  providers: [
    User_Service,
    ShoppingCart_Service,
    Product_Service,
    Tag_Service,
    Category_Service,
  ],
  exports: [User_Service],
})
export class User_Module {}
