import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Config for env variables
import { ConfigModule } from '@nestjs/config';

// Modules
import { User_Module } from './user/user.module';
import { Tag_Module } from './tag/tag.module';
import { Category_Module } from './category/category.module';
import { Product_Module } from './product/product.module';
import { ShoppingCart_Module } from './shopping_cart/shoppingCart.module';
import { Order_Module } from './order/order.module';
import { Auth_Module } from './auth/auth.module';
import { Reports_Module } from './reports/reports.module';
import { Bank_Module } from './bank/bank.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@comerciojjcproject.f9rmu.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    User_Module,
    ShoppingCart_Module,
    Product_Module,
    Tag_Module,
    Category_Module,
    Order_Module,
    Auth_Module,
    Reports_Module,
    Bank_Module,
  ],
})
export class AppModule {}
