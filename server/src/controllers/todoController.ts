
import { Response } from 'express';
import { validationResult } from 'express-validator';
import Todo from '../models/Todo';
import { AuthRequest, CreateTodoRequest, UpdateTodoRequest } from '../types';

export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ userId: req.user!.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error while fetching todos' });
  }
};

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
      return;
    }

    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
      userId: req.user!.id
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error while creating todo' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
      return;
    }

    const { id } = req.params;
    const updateData = req.body;

    const todo = await Todo.findOne({ _id: id, userId: req.user!.id });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error while updating todo' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, userId: req.user!.id });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error while deleting todo' });
  }
};

export const toggleTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await Todo.findOne({ _id: id, userId: req.user!.id });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true, runValidators: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ message: 'Server error while toggling todo' });
  }
};
