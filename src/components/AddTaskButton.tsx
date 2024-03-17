'use client';
import { FC, useState } from 'react';
import TaskInput from './TaskInput';
import { Button } from './ui/button';

interface AddTaskButtonProps {
  id: string;
}

const AddTaskButton: FC<AddTaskButtonProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen((c) => !c)}>Add Task</Button>
      {isOpen && <TaskInput id={id} setIsOpen={setIsOpen} />}
    </>
  );
};

export default AddTaskButton;
