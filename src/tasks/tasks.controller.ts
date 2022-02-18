import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterDto } from './dto/filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTasks(@Query() filterDto: FilterDto) {
    return await this.taskService.getTasks(filterDto);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TasksStatus,
  ) {
    return await this.taskService.updateStatus(id, status);
  }
  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    return await this.taskService.getTaskById(id);
  }
  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }
}
