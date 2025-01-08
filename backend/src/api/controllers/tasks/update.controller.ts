import { JwtAuthGuard } from "../../../config/jwt";
import { PrismaService } from "../../../data/prisma.service";
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
type dbStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";

@Controller()
export class UpdateTaskController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Patch("/task/:id")
  @HttpCode(200) // O código 200 é mais adequado para operações de sucesso
  async handle(
    @Body() input: { title: string; description: string; status: string; finishedAt?: string },
    @Param("id") id: string,
  ): Promise<void> {
    const { description, status, title, finishedAt } = input;

    // Validação do status
    const dbStatus = this.validateStatus(status);

    try {
      await this.prisma.task.update({
        data: {
          title,
          description,
          status: dbStatus,
          finishedAt,
        },
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException("Failed to update task.");
    }
  }

  // Função para validar o status da tarefa
  private validateStatus(status: string): dbStatus {
    const validStatuses: dbStatus[] = ["PENDENTE", "EM_PROGRESSO", "CONCLUIDA"];
    const normalizedStatus = status.toUpperCase() as dbStatus;

    if (!validStatuses.includes(normalizedStatus)) {
      throw new InternalServerErrorException(`Invalid status: ${status}`);
    }

    return normalizedStatus;
  }
}