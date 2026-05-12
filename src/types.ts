export interface TaskItem {
  id: string;
  level: 1 | 2 | 3 | 4;
  title: string;
  englishTitle?: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Layer {
  id: string;
  name: string;
  description?: string;
  tasks: TaskItem[];
}

export interface Phase {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  layers: Layer[];
}
