import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Bank
import { Bank_Controller } from './bank.controller';
import { Bank_Schema } from './bank.model';
import { Bank_Service } from './bank.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bank', schema: Bank_Schema }])],
  controllers: [Bank_Controller],
  providers: [Bank_Service],
  exports: [Bank_Service],
})
export class Bank_Module {}
