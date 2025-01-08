import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Configuração do CORS
   app.enableCors({
    origin: 'http://localhost:3000', // Permite o front-end no localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Se necessário para cookies ou autenticação
  });
  await app.listen(process.env.PORT ?? 3300);
}
bootstrap();
