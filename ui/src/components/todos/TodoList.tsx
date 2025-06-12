
import { motion, AnimatePresence } from 'framer-motion';
import { TodoItem } from './TodoItem';
import { useTodos } from '@/hooks/useTodos';

export const TodoList = () => {
  const { getFilteredTodos, isLoading } = useTodos();
  const todos = getFilteredTodos();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-muted-foreground text-lg">
          No todos found. Create your first todo to get started!
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="space-y-4">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
