export default function renderTasks(tasks, manager) {
  let rendered = [];
  if (tasks) {
    for (let index in tasks) {
      const task = tasks[index];
      // Если это не сохраненный таск
      if (!task.inputCopy) {
        rendered.push(manager(task, task.type, index));
      } else {
        rendered.push(manager(task, task.inputCopy.type, index));
      }
    }
  }
  return rendered;
}
