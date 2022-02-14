import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body('title') title, @Body('description') description) {
    return this.taskService.createTask(title, description);
  }
}
