import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// User
import { User_Controller } from 'src/user/user.controller';
import { User_Schema } from 'src/user/user.model';
import { User_Service } from 'src/user/user.service';

// Shopping cart
import { ShoppingCart_Controller } from 'src/shopping_cart/shoppingCart.controller';
import { ShoppingCart_Schema } from 'src/shopping_cart/shoppingCart.model';
import { ShoppingCart_Service } from 'src/shopping_cart/shoppingCart.service';

// Product
import { Product_Controller } from 'src/product/product.controller';
import { Product_Schema } from 'src/product/product.model';
import { Product_Service } from 'src/product/product.service';

// tag
import { Category_Controller } from 'src/category/category.controller';
import { Category_Schema } from 'src/category/category.model';
import { Category_Service } from 'src/category/category.service';

// cateogry
import { Tag_Controller } from 'src/tag/tag.controller';
import { Tag_Schema } from 'src/tag/tag.model';
import { Tag_Service } from 'src/tag/tag.service';

// Order
import { Order_Controller } from 'src/order/order.controller';
import { Order_Schema } from 'src/order/order.model';
import { Order_Service } from 'src/order/order.service';
import { Report_Controller } from './reports.controller';
import { Report_Service } from './reports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User_Schema },
      { name: 'ShoppingCart', schema: ShoppingCart_Schema },
      { name: 'Product', schema: Product_Schema },
      { name: 'Category', schema: Category_Schema },
      { name: 'Tag', schema: Tag_Schema },
      { name: 'Order', schema: Order_Schema },
    ]),
  ],
  controllers: [
    Report_Controller,
    User_Controller,
    ShoppingCart_Controller,
    Product_Controller,
    Tag_Controller,
    Category_Controller,
    Order_Controller,
  ],
  providers: [
    Report_Service,
    User_Service,
    ShoppingCart_Service,
    Product_Service,
    Tag_Service,
    Category_Service,
    Order_Service,
  ],
})
export class Reports_Module {}
