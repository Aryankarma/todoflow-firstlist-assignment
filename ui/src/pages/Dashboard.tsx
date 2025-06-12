import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { TodoForm } from '@/components/todos/TodoForm';
import { TodoFilter } from '@/components/todos/TodoFilter';
import { TodoList } from '@/components/todos/TodoList';
import { useTodos } from '@/hooks/useTodos';

const Dashboard = () => {
  const { fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Todos</h1>
            <p className="text-muted-foreground">
              Stay organized and get things done efficiently
            </p>
          </div>

          <TodoForm />
          <TodoFilter />
          <TodoList />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
