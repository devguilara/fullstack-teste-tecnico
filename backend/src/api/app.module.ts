import { Module } from '@nestjs/common';
import { PrismaService } from '../data/prisma.service';
import { RoutesMap } from './routes.module'
@Module({
  imports: [RoutesMap],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
