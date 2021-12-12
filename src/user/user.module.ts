import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// User
import { User_Controller } from './user.controller';
import { User_Service } from './user.service';
import { User_Schema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: User_Schema }])],
  controllers: [User_Controller],
  providers: [User_Service],
})
export class User_Module {}
