import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// User
import { Category_Controller } from './category.controller';
import { Category_Service } from './category.service';
import { Category_Schema } from './category.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: Category_Schema }]),
  ],
  controllers: [Category_Controller],
  providers: [Category_Service],
})
export class Category_Module {}
