import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  // @Get()
  // getAllTasks(): Task[] {
  //   return this.taskService.getAllTasks();
  // }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  // @Patch('/:id/status')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TasksStatus,
  // ) {
  //   return this.taskService.updateStatus(id, status);
  // }
  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    return await this.taskService.getTaskById(id);
  }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   return this.taskService.deleteTask(id);
  // }
}
