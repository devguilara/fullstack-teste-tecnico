import { JwtAuthGuard } from "../../../config/jwt";
import { PrismaService } from "../../../data/prisma.service";
import {
    Controller,
    Delete,
    HttpCode,
    InternalServerErrorException,
    NotFoundException,
    Param,
    UseGuards,
  } from "@nestjs/common";
  
  type TaskStatus = "PENDENTE" | "EM_PROGRESSO" | "CONCLUIDA";
  
  export class TaskResponseDto {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    finishedAt: Date | null;
  }
  
  @Controller()
  export class DeleteTaskController {
    constructor(private prisma: PrismaService) {}
  
    @UseGuards(JwtAuthGuard)
    @Delete("/task/:id")
    @HttpCode(200)
    async handle(@Param("id") id: string): Promise<TaskResponseDto> {
      if (!id) {
        throw new NotFoundException("Task ID is required");
      }
  
      try {
        const task = await this.prisma.task.delete({
          where: { id },
        });
  
        if (!task) {
          throw new NotFoundException("Task not found");
        }
  
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status as TaskStatus,
          createdAt: task.createdAt,
          finishedAt: task.finishedAt || null,
        };
      } catch (error) {
        throw new InternalServerErrorException("Failed to delete task.");
      }
    }
  }