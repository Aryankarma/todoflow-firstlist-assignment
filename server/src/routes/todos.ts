
import { Router, type Router as ExpressRouter } from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} from '../controllers/todoController';
import { authenticate } from '../middleware/auth';
import { validateCreateTodo, validateUpdateTodo } from '../middleware/validation';

const router: ExpressRouter = Router();


router.use(authenticate);

router.get('/', getTodos);


router.post('/', validateCreateTodo, createTodo);


router.put('/:id', validateUpdateTodo, updateTodo);


router.delete('/:id', deleteTodo);


router.patch('/:id/toggle', toggleTodo);

export default router;
