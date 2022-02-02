import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// User
import { Tag_Controller } from './tag.controller';
import { Tag_Service } from './tag.service';
import { Tag_Schema } from './tag.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: Tag_Schema }])],
  controllers: [Tag_Controller],
  providers: [Tag_Service],
})
export class Tag_Module {}
