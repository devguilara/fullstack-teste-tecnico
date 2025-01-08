import { PrismaService } from "../../../data/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { env } from "../../../config/variables";

const JWT_SECRET = env.JWT_SECRET;

@Controller()
export class LoginController {
  constructor(private prisma: PrismaService) {}

  @Post("/login")
  @HttpCode(200)
  async handle(
    @Body() input: { email: string; password: string },
  ): Promise<{ token: string }> {
    const { email, password } = input;

    // Validações manuais do corpo da requisição
    if (!email || !email.includes("@")) {
      throw new UnauthorizedException("Formato inválido.");
    }

    if (!password || password.length < 6) {
      throw new UnauthorizedException("Senha precisa de pelo menos 6 caracteres");
    }

    // Busca o usuário no banco de dados
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Email ou senha invalida");
    }

    // Verifica se a senha é válida
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou senha invalida");
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { token };
  }
}
