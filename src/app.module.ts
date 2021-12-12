import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Config for env variables
import { ConfigModule } from '@nestjs/config';
import { User_Module } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@comerciojjcproject.f9rmu.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    User_Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
