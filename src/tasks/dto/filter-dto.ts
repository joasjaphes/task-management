import { TasksStatus } from '../task-status.enum';

export class FilterDto {
  status: TasksStatus;
  search: string;
}
