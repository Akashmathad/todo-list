import { Star } from 'lucide-react';
import { FC } from 'react';
import Timer from './Timer';
import TodoCompletedButton from './TodoCompletedButton';
import TodoDeleteButton from './TodoDeleteButton';
import { formatTimestampToIST } from '@/lib/formatTimeStamp';

interface TaskProps {
  todo: {
    id: string;
    title: string;
    description?: string;
    createdAt: number;
    endTime: number;
    priority: boolean;
    completed: boolean;
  };
}

const Task: FC<TaskProps> = ({ todo }) => {
  const { id, title, description, createdAt, endTime, priority, completed } =
    todo;

  return (
    <div
      className={`w-full p-6 relative bg-primary_light rounded-lg border border-border shadow-md flex flex-col gap-1.5 ${
        priority ? 'border-primary' : 'border-border'
      } ${completed && 'opacity-30'}`}
    >
      <div className="absolute top-1.5 right-2 flex items-center gap-1">
        {' '}
        {priority && (
          <Star
            size={28}
            strokeWidth={2.5}
            className="text-primary text-yellow-500"
          />
        )}
        <TodoDeleteButton id={id} title={title} key={id} />
      </div>

      <p className="text-xl font-medium">{title}</p>
      <p className="w-5/6 leading-[1.6]">{description}</p>
      <p>Created At: {formatTimestampToIST(createdAt)}</p>
      <p>
        Time Left:{' '}
        <Timer
          key={id}
          time={new Date(endTime).getTime() - Date.now()}
          completed={completed}
        />
      </p>
      <div className="absolute bottom-4 right-3 flex gap-2 items-center justify-center">
        <p className="text-xl">Done?</p>
        <TodoCompletedButton id={id} isCompleted={completed} />
      </div>
    </div>
  );
};

export default Task;
