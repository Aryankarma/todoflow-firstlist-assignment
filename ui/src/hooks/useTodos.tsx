
import { create } from 'zustand';
import { TodoState, Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types';
import { todoService } from '@/services/todos';
import { toast } from '@/hooks/use-toast';

interface TodoStore extends TodoState {
  fetchTodos: () => Promise<void>;
  createTodo: (data: CreateTodoRequest) => Promise<void>;
  updateTodo: (id: string, data: UpdateTodoRequest) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  getFilteredTodos: () => Todo[];
}

export const useTodos = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  filter: 'all',

  fetchTodos: async () => {
    set({ isLoading: true });
    try {
      const todos = await todoService.getTodos();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  createTodo: async (data: CreateTodoRequest) => {
    try {
      const newTodo = await todoService.createTodo(data);
      set(state => ({
        todos: [newTodo, ...state.todos]
      }));
      toast({
        title: 'Todo created',
        description: 'Your new todo has been added successfully.',
      });
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  },

  updateTodo: async (id: string, data: UpdateTodoRequest) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, data);
      set(state => ({
        todos: state.todos.map(todo => 
          todo._id === id ? updatedTodo : todo
        )
      }));
      toast({
        title: 'Todo updated',
        description: 'Your todo has been updated successfully.',
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  },

  deleteTodo: async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      set(state => ({
        todos: state.todos.filter(todo => todo._id !== id)
      }));
      toast({
        title: 'Todo deleted',
        description: 'Your todo has been removed.',
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  },

  toggleTodo: async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await todoService.toggleTodo(id, completed);
      set(state => ({
        todos: state.todos.map(todo => 
          todo._id === id ? updatedTodo : todo
        )
      }));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  },

  setFilter: (filter: 'all' | 'completed' | 'pending') => {
    set({ filter });
  },

  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  },
}));
