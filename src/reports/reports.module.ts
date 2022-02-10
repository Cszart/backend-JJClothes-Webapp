import { Module } from '@nestjs/common';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

//product
import { Product_Schema } from 'src/product/product.model';
import { Product_Controller } from 'src/product/product.controller';
import { Product_Service } from 'src/product/product.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: Product_Schema }]),
  ],
  controllers: [ReportsController, Product_Controller],
  providers: [ReportsService, Product_Service],
})
export class ReportsModule {}
