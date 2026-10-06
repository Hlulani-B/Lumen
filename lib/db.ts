import Database from 'better-sqlite3';
import path from 'path';

// Initialize database
const dbPath = path.join(process.cwd(), 'study_planner.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize tables
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      color TEXT DEFAULT '#fbfcffff',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL,
      day_of_week TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      due_date DATETIME,
      priority INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('link', 'pdf', 'doc', 'image', 'video')),
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      size TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
    );
  `);
}

// ============= SUBJECTS CRUD =============

export interface Subject {
  id?: number;
  name: string;
  description?: string;
  color?: string;
  created_at?: string;
}

export function createSubject(name: string, description?: string, color?: string): number {
  const stmt = db.prepare('INSERT INTO subjects (name, description, color) VALUES (?, ?, ?)');
  const result = stmt.run(name, description || null, color || '#3B82F6');
  return result.lastInsertRowid as number;
}

export function getSubject(id: number): Subject | undefined {
  const stmt = db.prepare('SELECT * FROM subjects WHERE id = ?');
  return stmt.get(id) as Subject | undefined;
}

export function getAllSubjects(): Subject[] {
  const stmt = db.prepare('SELECT * FROM subjects ORDER BY created_at DESC');
  return stmt.all() as Subject[];
}

export function updateSubject(id: number, name: string, description?: string, color?: string): boolean {
  const stmt = db.prepare('UPDATE subjects SET name = ?, description = ?, color = ? WHERE id = ?');
  const result = stmt.run(name, description || null, color || '#3B82F6', id);
  return result.changes > 0;
}

export function deleteSubject(id: number): boolean {
  const stmt = db.prepare('DELETE FROM subjects WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// ============= SCHEDULES CRUD =============

export interface Schedule {
  id?: number;
  subject_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  location?: string;
  created_at?: string;
}

export function createSchedule(
  subject_id: number,
  day_of_week: string,
  start_time: string,
  end_time: string,
  location?: string
): number {
  const stmt = db.prepare(
    'INSERT INTO schedules (subject_id, day_of_week, start_time, end_time, location) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(subject_id, day_of_week, start_time, end_time, location || null);
  return result.lastInsertRowid as number;
}

export function getSchedule(id: number): Schedule | undefined {
  const stmt = db.prepare('SELECT * FROM schedules WHERE id = ?');
  return stmt.get(id) as Schedule | undefined;
}

export function getSchedulesBySubject(subject_id: number): Schedule[] {
  const stmt = db.prepare('SELECT * FROM schedules WHERE subject_id = ? ORDER BY day_of_week, start_time');
  return stmt.all(subject_id) as Schedule[];
}

export function getAllSchedules(): Schedule[] {
  const stmt = db.prepare(`
    SELECT s.*, sub.name as subject_name 
    FROM schedules s 
    JOIN subjects sub ON s.subject_id = sub.id 
    ORDER BY 
      CASE day_of_week
        WHEN 'Monday' THEN 1
        WHEN 'Tuesday' THEN 2
        WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4
        WHEN 'Friday' THEN 5
        WHEN 'Saturday' THEN 6
        WHEN 'Sunday' THEN 7
      END,
      start_time
  `);
  return stmt.all() as Schedule[];
}

export function updateSchedule(
  id: number,
  subject_id: number,
  day_of_week: string,
  start_time: string,
  end_time: string,
  location?: string
): boolean {
  const stmt = db.prepare(
    'UPDATE schedules SET subject_id = ?, day_of_week = ?, start_time = ?, end_time = ?, location = ? WHERE id = ?'
  );
  const result = stmt.run(subject_id, day_of_week, start_time, end_time, location || null, id);
  return result.changes > 0;
}

export function deleteSchedule(id: number): boolean {
  const stmt = db.prepare('DELETE FROM schedules WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// ============= TASKS CRUD =============

export interface Task {
  id?: number;
  subject_id: number;
  title: string;
  description?: string;
  due_date?: string;
  priority?: number;
  completed?: number;
  created_at?: string;
}

export function createTask(
  subject_id: number,
  title: string,
  description?: string,
  due_date?: string,
  priority: number = 0
): number {
  const stmt = db.prepare(
    'INSERT INTO tasks (subject_id, title, description, due_date, priority) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(subject_id, title, description || null, due_date || null, priority);
  return result.lastInsertRowid as number;
}

export function getTask(id: number): Task | undefined {
  const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
  return stmt.get(id) as Task | undefined;
}

export function getTasksBySubject(subject_id: number): Task[] {
  const stmt = db.prepare('SELECT * FROM tasks WHERE subject_id = ? ORDER BY due_date, priority DESC');
  return stmt.all(subject_id) as Task[];
}

export function getAllTasks(): Task[] {
  const stmt = db.prepare(`
    SELECT t.*, sub.name as subject_name 
    FROM tasks t 
    JOIN subjects sub ON t.subject_id = sub.id 
    ORDER BY t.due_date, t.priority DESC
  `);
  return stmt.all() as Task[];
}

export function getPendingTasks(): Task[] {
  const stmt = db.prepare(`
    SELECT t.*, sub.name as subject_name 
    FROM tasks t 
    JOIN subjects sub ON t.subject_id = sub.id 
    WHERE t.completed = 0
    ORDER BY t.due_date, t.priority DESC
  `);
  return stmt.all() as Task[];
}

export function updateTask(
  id: number,
  title: string,
  description?: string,
  due_date?: string,
  priority?: number,
  completed?: number
): boolean {
  const stmt = db.prepare(
    'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, completed = ? WHERE id = ?'
  );
  const result = stmt.run(title, description || null, due_date || null, priority ?? 0, completed ?? 0, id);
  return result.changes > 0;
}

export function markTaskCompleted(id: number): boolean {
  const stmt = db.prepare('UPDATE tasks SET completed = 1 WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function markTaskPending(id: number): boolean {
  const stmt = db.prepare('UPDATE tasks SET completed = 0 WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function deleteTask(id: number): boolean {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// Initialize database on import
initializeDatabase();

// ============= TOPICS CRUD =============

export interface Topic {
  id?: number;
  subject_id: number;
  title: string;
  description?: string;
  created_at?: string;
}

export function createTopic(subject_id: number, title: string, description?: string): number {
  const stmt = db.prepare('INSERT INTO topics (subject_id, title, description) VALUES (?, ?, ?)');
  const result = stmt.run(subject_id, title, description || null);
  return result.lastInsertRowid as number;
}

export function getTopic(id: number): Topic | undefined {
  const stmt = db.prepare('SELECT * FROM topics WHERE id = ?');
  return stmt.get(id) as Topic | undefined;
}

export function getTopicsBySubject(subject_id: number): Topic[] {
  const stmt = db.prepare('SELECT * FROM topics WHERE subject_id = ? ORDER BY created_at DESC');
  return stmt.all(subject_id) as Topic[];
}

export function getAllTopics(): Topic[] {
  const stmt = db.prepare(`
    SELECT t.*, sub.name as subject_name 
    FROM topics t 
    JOIN subjects sub ON t.subject_id = sub.id 
    ORDER BY t.created_at DESC
  `);
  return stmt.all() as Topic[];
}

export function updateTopic(id: number, title: string, description?: string): boolean {
  const stmt = db.prepare('UPDATE topics SET title = ?, description = ? WHERE id = ?');
  const result = stmt.run(title, description || null, id);
  return result.changes > 0;
}

export function deleteTopic(id: number): boolean {
  const stmt = db.prepare('DELETE FROM topics WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// ============= MATERIALS CRUD =============

export interface Material {
  id?: number;
  topic_id: number;
  type: 'link' | 'pdf' | 'doc' | 'image' | 'video';
  name: string;
  url: string;
  size?: string;
  created_at?: string;
}

export function createMaterial(
  topic_id: number,
  type: 'link' | 'pdf' | 'doc' | 'image' | 'video',
  name: string,
  url: string,
  size?: string
): number {
  const stmt = db.prepare(
    'INSERT INTO materials (topic_id, type, name, url, size) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(topic_id, type, name, url, size || null);
  return result.lastInsertRowid as number;
}

export function getMaterial(id: number): Material | undefined {
  const stmt = db.prepare('SELECT * FROM materials WHERE id = ?');
  return stmt.get(id) as Material | undefined;
}

export function getMaterialsByTopic(topic_id: number): Material[] {
  const stmt = db.prepare('SELECT * FROM materials WHERE topic_id = ? ORDER BY created_at DESC');
  return stmt.all(topic_id) as Material[];
}

export function getAllMaterials(): Material[] {
  const stmt = db.prepare(`
    SELECT m.*, t.title as topic_title
    FROM materials m
    JOIN topics t ON m.topic_id = t.id
    ORDER BY m.created_at DESC
  `);
  return stmt.all() as Material[];
}

export function updateMaterial(
  id: number,
  type: 'link' | 'pdf' | 'doc' | 'image' | 'video',
  name: string,
  url: string,
  size?: string
): boolean {
  const stmt = db.prepare(
    'UPDATE materials SET type = ?, name = ?, url = ?, size = ? WHERE id = ?'
  );
  const result = stmt.run(type, name, url, size || null, id);
  return result.changes > 0;
}

export function deleteMaterial(id: number): boolean {
  const stmt = db.prepare('DELETE FROM materials WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// ============= NOTES CRUD =============

export interface Note {
  id?: number;
  topic_id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export function createNote(topic_id: number, title: string, content: string): number {
  const stmt = db.prepare('INSERT INTO notes (topic_id, title, content) VALUES (?, ?, ?)');
  const result = stmt.run(topic_id, title, content);
  return result.lastInsertRowid as number;
}

export function getNote(id: number): Note | undefined {
  const stmt = db.prepare('SELECT * FROM notes WHERE id = ?');
  return stmt.get(id) as Note | undefined;
}

export function getNotesByTopic(topic_id: number): Note[] {
  const stmt = db.prepare('SELECT * FROM notes WHERE topic_id = ? ORDER BY updated_at DESC');
  return stmt.all(topic_id) as Note[];
}

export function getAllNotes(): Note[] {
  const stmt = db.prepare(`
    SELECT n.*, t.title as topic_title
    FROM notes n
    JOIN topics t ON n.topic_id = t.id
    ORDER BY n.updated_at DESC
  `);
  return stmt.all() as Note[];
}

export function updateNote(id: number, title: string, content: string): boolean {
  const stmt = db.prepare('UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const result = stmt.run(title, content, id);
  return result.changes > 0;
}

export function deleteNote(id: number): boolean {
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export default db;
