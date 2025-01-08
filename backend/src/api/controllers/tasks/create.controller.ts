import { JwtAuthGuard } from "../../../config/jwt";
import { PrismaService } from "../../../data/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";

type dbStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";

interface TaskControllerBody {
  title: string;
  description: string;
  status: "pendente" | "em_progresso" | "concluida";
  finishedAt?: string; // Data em formato ISO opcional
}

@Controller()
export class CreateTaskController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/task")
  @HttpCode(201)
  async handle(
    @Body() input: TaskControllerBody,
    @Request() req: any, // Usando o tipo genérico `any` do NestJS para simplificar
  ): Promise<void> {
    const { title, description, status, finishedAt } = input;

    // Validações manuais
    if (!title || typeof title !== "string") {
      throw new BadRequestException("Titulo Inválido.");
    }
    if (!description || typeof description !== "string") {
      throw new BadRequestException("Descrição Inválida.");
    }
    if (!["pendente", "em_progresso", "concluida"].includes(status)) {
      throw new BadRequestException("Status Inválido");
    }
    if (finishedAt && isNaN(Date.parse(finishedAt))) {
      throw new BadRequestException("Data de Finalização Inválida.");
    }

    const dbStatus = status.toUpperCase() as dbStatus;

    try {
      await this.prisma.task.create({
        data: {
          title,
          description,
          status: dbStatus,
          finishedAt: finishedAt ? new Date(finishedAt) : undefined,
          userId: req.user?.userId, // Propriedade `user` vinda do JwtAuthGuard
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Falha ao criar tarefa");
    }
  }
}
