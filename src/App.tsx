import { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskCalendar } from './components/TaskCalendar';
import type { Task } from './lib/supabase';
import * as taskService from './lib/taskService';
import './App.css';

type View = 'list' | 'calendar';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<View>('list');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const created = await taskService.createTask(newTask);
      setTasks([...tasks, created]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    try {
      const updated = await taskService.toggleTaskComplete(id, isCompleted);
      setTasks(tasks.map(task => task.id === id ? updated : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleHighlight = async (id: string, isHighlighted: boolean) => {
    try {
      const updated = await taskService.toggleTaskHighlight(id, isHighlighted);
      setTasks(tasks.map(task => task.id === id ? updated : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Campus Task Tracker</h1>
          <p className="app-subtitle">Organize your assignments and stay on top of your coursework</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="toolbar">
            <div className="view-switcher">
              <button
                className={`view-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
              >
                List View
              </button>
              <button
                className={`view-btn ${view === 'calendar' ? 'active' : ''}`}
                onClick={() => setView('calendar')}
              >
                Calendar View
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Task'}
            </button>
          </div>

          {showForm && (
            <div className="form-container">
              <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
            </div>
          )}

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <div className="content">
              {view === 'list' ? (
                <TaskList
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onToggleHighlight={handleToggleHighlight}
                  onDelete={handleDeleteTask}
                />
              ) : (
                <TaskCalendar tasks={tasks} />
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built for Campus Project Presentation</p>
      </footer>
    </div>
  );
}

export default App;
