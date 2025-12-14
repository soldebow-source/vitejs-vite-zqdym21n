import type { Task } from '../lib/supabase';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onToggleHighlight: (id: string, isHighlighted: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onToggleHighlight, onDelete }: TaskListProps) {
  const incompleteTasks = tasks.filter(task => !task.is_completed);
  const completedTasks = tasks.filter(task => task.is_completed);

  return (
    <div className="task-list">
      {incompleteTasks.length > 0 && (
        <div className="task-section">
          <h3 className="task-section-title">Upcoming Tasks ({incompleteTasks.length})</h3>
          <div className="task-section-content">
            {incompleteTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onToggleHighlight={onToggleHighlight}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="task-section-title">Completed Tasks ({completedTasks.length})</h3>
          <div className="task-section-content">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onToggleHighlight={onToggleHighlight}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet. Add your first task to get started!</p>
        </div>
      )}
    </div>
  );
}
