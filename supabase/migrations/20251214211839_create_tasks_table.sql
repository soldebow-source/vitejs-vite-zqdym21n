/*
  # Create Campus Task Tracker Schema

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key) - Unique identifier for each task
      - `title` (text, required) - Task title/name
      - `description` (text, optional) - Detailed task description
      - `due_date` (date, required) - When the task is due
      - `is_completed` (boolean, default false) - Task completion status
      - `is_highlighted` (boolean, default false) - Whether task is highlighted/important
      - `created_at` (timestamptz, default now()) - When task was created
      - `updated_at` (timestamptz, default now()) - Last update timestamp

  2. Security
    - Enable RLS on `tasks` table
    - Add policy for public access (for demo/school project purposes)
    
  3. Notes
    - This is a simple implementation without user authentication
    - All users can view and modify all tasks (suitable for single-user or demo scenarios)
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  due_date date NOT NULL,
  is_completed boolean DEFAULT false,
  is_highlighted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to tasks"
  ON tasks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to tasks"
  ON tasks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to tasks"
  ON tasks
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to tasks"
  ON tasks
  FOR DELETE
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_is_completed ON tasks(is_completed);