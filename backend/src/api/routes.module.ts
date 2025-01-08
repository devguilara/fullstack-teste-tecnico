import { PrismaService } from "../data/prisma.service";
import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/auth/login.controller";
import { RegisterController } from "./controllers/auth/register.controller";
import { CreateTaskController } from "./controllers/tasks/create.controller";
import { ShowTasksController } from "./controllers/tasks/show.controller";
import { DeleteTaskController } from "./controllers/tasks/delete.controller";
import { UpdateTaskController } from "./controllers/tasks/update.controller";

@Module({
  imports: [],
  providers: [PrismaService],
  controllers: [ 
    LoginController,
    RegisterController,
    CreateTaskController,
    ShowTasksController,
    DeleteTaskController,
    UpdateTaskController
  ],
})
export class RoutesMap {}
