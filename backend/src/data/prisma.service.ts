import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], 
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      throw error; 
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Conexão com o banco de dados encerrada.');
    } catch (error) {
      console.error('Erro ao desconectar do banco de dados:', error);
    }
  }

  useMiddlewares() {
    this.$use(async (params, next) => {
      const start = Date.now();
      const result = await next(params);
      const duration = Date.now() - start;
      console.log(`[Prisma] ${params.model}.${params.action} executado em ${duration}ms`);
      return result;
    });
  }
}
