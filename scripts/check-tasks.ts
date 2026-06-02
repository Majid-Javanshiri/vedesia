import { PROJECT_DATA } from '../src/constants';

let totalTasks = 0;
let tasksWithSubTasks = 0;
const tasksWithoutSubTasks: string[] = [];

PROJECT_DATA.forEach(phase => {
  phase.layers.forEach(layer => {
    layer.tasks.forEach(task => {
      totalTasks++;
      if (task.tasks && task.tasks.length > 0) {
        tasksWithSubTasks++;
      } else {
        tasksWithoutSubTasks.push(task.id + ': ' + task.titleEn);
      }
    });
  });
});

console.log(`Total Level-1/Sub-projects (tasks): ${totalTasks}`);
console.log(`Tasks with sub-tasks: ${tasksWithSubTasks}`);
console.log(`Tasks without sub-tasks: ${tasksWithoutSubTasks.length}`);
console.log('Sample tasks without sub-tasks:', tasksWithoutSubTasks.slice(0, 50));
