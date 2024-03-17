'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface TodoDeleteButtonProps {
  id: string;
  title: string;
}

const TodoDeleteButton: FC<TodoDeleteButtonProps> = ({ id, title }) => {
  const router = useRouter();
  async function deleteTodo() {
    try {
      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: 'DELETE',
      });
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {' '}
        <X
          size={36}
          strokeWidth={2}
          className="text-red-500  cursor-pointer rounded-sm"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You want to delete Task: {title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTodo}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TodoDeleteButton;
