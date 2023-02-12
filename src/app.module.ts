import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AvatarsController } from './avatars/avatars.controller';
import { AvatarsService } from './avatars/avatars.service';
import * as cors from 'cors';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AvatarsController],
  providers: [AvatarsService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cors({origin: 'http://127.0.0.1:5500'})).forRoutes('*');
  }
}
