import { format } from 'date-fns';
import type { Task } from '../lib/supabase';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onToggleHighlight: (id: string, isHighlighted: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onToggleHighlight, onDelete }: TaskItemProps) {
  return (
    const classes = ['task-item'];
    if(task.is_completed) classes.push('completed');
    if(task.is_highlighted) classes.push('highlighted');
    <div className={classes.join(' ')}></div>    
      <div className="task-checkbox">
   
// Checkbox toggles task completion   
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={(e) => onToggleComplete(task.id, e.target.checked)}
          id={`task-${task.id}`}
        />
      </div>
      <div className="task-content">
        <label htmlFor={`task-${task.id}`} className="task-title">
          {task.title}
        </label>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="task-date">
            {format(new Date(task.due_date), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={() => onToggleHighlight(task.id, !task.is_highlighted)}
          className={`btn-icon ${task.is_highlighted ? 'active' : ''}`}
          title={task.is_highlighted ? 'Remove highlight' : 'Highlight task'}
        >
          ★
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-icon btn-delete"
          title="Delete task"
        >
          ×
        </button>
      </div>
    </div>
  );
}
