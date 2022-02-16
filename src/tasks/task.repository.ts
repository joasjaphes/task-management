import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterDto } from './dto/filter-dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TasksStatus.OPEN;
    await task.save();
    return task;
  }

  async getTasks(filterDto: FilterDto) {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',

        { search: `%${search}%` },
      );
    }
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    return await query.getMany();
  }
}
