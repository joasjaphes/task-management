import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TasksStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  allowedStatus = [TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE];
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`'${value}' is not a valid status value`);
    }
    return value;
  }

  isStatusValid(status: TasksStatus): boolean {
    return this.allowedStatus.indexOf(status) >= 0;
  }
}
