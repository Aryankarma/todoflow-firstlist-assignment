
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTodos } from '@/hooks/useTodos';

export const TodoFilter = () => {
  const { filter, setFilter, todos } = useTodos();

  const counts = {
    all: todos.length,
    pending: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  const filters = [
    { key: 'all' as const, label: 'All', count: counts.all },
    { key: 'pending' as const, label: 'Pending', count: counts.pending },
    { key: 'completed' as const, label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={filter === key ? 'default' : 'outline'}
          onClick={() => setFilter(key)}
          className="relative"
        >
          {label}
          <Badge variant="secondary" className="ml-2 text-xs">
            {count}
          </Badge>
        </Button>
      ))}
    </div>
  );
};
