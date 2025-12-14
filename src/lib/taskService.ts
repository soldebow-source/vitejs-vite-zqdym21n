import { supabase } from './supabase';
import type { Task } from './supabase';

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function toggleTaskComplete(id: string, isCompleted: boolean): Promise<Task> {
  return updateTask(id, { is_completed: isCompleted });
}

export async function toggleTaskHighlight(id: string, isHighlighted: boolean): Promise<Task> {
  return updateTask(id, { is_highlighted: isHighlighted });
}
