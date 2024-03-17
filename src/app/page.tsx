import AddTaskButton from '@/components/AddTaskButton';
import Task from '@/components/Task';
import { getAuthSession } from '@/lib/auth';
import axios from 'axios';

async function getTodos(id: string) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/todo/${id}`);

    return data.todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

const page = async () => {
  const session = await getAuthSession();
  const todos = await getTodos(session?.user.userId || '');

  if (!session?.user) {
    console.log(todos);
    return (
      <div className="container mt-20 text-center text-2xl">
        <p>Welcome, please sign-in to start using Task - Buddy</p>
      </div>
    );
  }

  return (
    <div className="container pt-[6rem] flex flex-col gap-6 pb-10">
      <p className="text-center text-3xl">
        Welcome back,{' '}
        <span className="font-medium tracking-wide">
          {session?.user.username}
        </span>{' '}
      </p>

      <div className="mx-auto w-[40rem] flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl">Tasks</p>
          <AddTaskButton id={session?.user.userId} />
        </div>
        <div className="flex flex-col gap-3">
          {todos.map((todo: any) => (
            <Task todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
