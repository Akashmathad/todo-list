'use client';
import { FC } from 'react';
import { Checkbox } from './ui/checkbox';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TodoCompletedButtonProps {
  id: string;
  isCompleted: boolean;
}

const TodoCompletedButton: FC<TodoCompletedButtonProps> = ({
  id,
  isCompleted,
}) => {
  const router = useRouter();
  async function handleChange() {
    await axios.patch(`http://localhost:3000/api/todo/${id}`, {
      value: !isCompleted,
    });
    router.refresh();
  }
  return (
    <Checkbox
      onClick={handleChange}
      defaultChecked={isCompleted}
      className="h-7 w-7"
    />
  );
};

export default TodoCompletedButton;
