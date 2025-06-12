
import api from '@/lib/api';
import { CreateTodoRequest, UpdateTodoRequest, Todo } from '@/types';

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (data: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoRequest): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  toggleTodo: async (id: string, completed: boolean): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle`, { completed });
    return response.data;
  }
};
