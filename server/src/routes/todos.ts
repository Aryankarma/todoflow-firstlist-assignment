
import { Router } from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} from '../controllers/todoController';
import { authenticate } from '../middleware/auth';
import { validateCreateTodo, validateUpdateTodo } from '../middleware/validation';

const router = Router();

// Apply authentication to all todo routes
router.use(authenticate);

// GET /api/todos
router.get('/', getTodos);

// POST /api/todos
router.post('/', validateCreateTodo, createTodo);

// PUT /api/todos/:id
router.put('/:id', validateUpdateTodo, updateTodo);

// DELETE /api/todos/:id
router.delete('/:id', deleteTodo);

// PATCH /api/todos/:id/toggle
router.patch('/:id/toggle', toggleTodo);

export default router;
