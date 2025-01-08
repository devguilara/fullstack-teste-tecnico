import { PrismaService } from "../../../data/prisma.service";
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { hash } from "bcryptjs";

interface UserControllerBody {
  name: string;
  email: string;
  password: string;
}

@Controller()
export class RegisterController {
  constructor(private prisma: PrismaService) {}

  @Post("/register")
  @HttpCode(200)
  async handle(@Body() body: UserControllerBody): Promise<void> {
    const { email, name, password } = body;

    // Validação básica manual
    if (!email || !name || !password) {
      throw new ConflictException("Existem campos faltantes");
    }
    if (!this.validateEmail(email)) {
      throw new ConflictException("Formato de email invalido");
    }

    // Verificar existência do usuário
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("Email já esta em uso.");
    }

    const hashedPassword = await hash(password, 10);

    try {
      // Criar usuário no banco de dados
      await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Falha ao criar usuario.");
    }
  }

  // Função para validar formato de e-mail
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
