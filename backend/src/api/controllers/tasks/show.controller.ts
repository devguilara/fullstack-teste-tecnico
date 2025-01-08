import { JwtAuthGuard } from "../../../config/jwt";
import { PrismaService } from "../../../data/prisma.service";
import {
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Request,
  UseGuards,
} from "@nestjs/common";

type TaskStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";

export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date | null;
  finishedAt: Date | null;
}

@Controller()
export class ShowTasksController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/task")
  @HttpCode(200)
  async handle(@Request() req: any): Promise<TaskResponseDto[]> {
    try {
      const user = req.user;

      const tasks = await this.prisma.task.findMany({
        where: { userId: user.userId },
      });

      // Mapeando os dados para garantir o tipo da resposta
      return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status as TaskStatus,
        createdAt: task.createdAt || null,
        finishedAt: task.finishedAt || null,
      }));
    } catch (error) {
      throw new InternalServerErrorException("Failed to list tasks.");
    }
  }
}
