import { useState } from 'react';
import type { FormEvent } from 'react';
import { format } from 'date-fns';

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    due_date: string;
    is_completed: boolean;
    is_highlighted: boolean;
  }) => void;
  onCancel?: () => void;
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
// Track input fields for title, description, and due date

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
const handleSubmit = (e: FormEvent) => { ... }
  }
// Prevent default form submission and reset fields after adding a task
 

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate,
      is_completed: false,
      is_highlighted: false,
    });

    setTitle('');
    setDescription('');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input form-textarea"
          rows={3}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
