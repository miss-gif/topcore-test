import { useRef, useState } from "react";
import TodoListTable from "./components/TodoListTable";
import { Button } from "./components/ui/button";
import { initData } from "./mocks/initData";
import { IInitData } from "./types/type";

const App = () => {
  const [tasks, setTasks] = useState(initData);
  const [isAddTask, setIsAddTask] = useState(false);
  const taskIdRef = useRef(4);

  const handleAddTask = () => {
    setIsAddTask(true);
  };

  const addNewTask = (taskName: string, taskStatus: IInitData["status"]) => {
    const newTask: IInitData = {
      id: taskIdRef.current.toString().padStart(2, "0"), // 고유 ID 생성
      name: taskName, // 전달된 taskName
      status: taskStatus, // 전달된 taskStatus
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // 새로운 작업 추가
    taskIdRef.current += 1; // 다음 작업 ID 증가
    setIsAddTask(false); // AddTask 모드 종료
  };

  const updateTask = (
    id: string,
    newName: string,
    newStatus: IInitData["status"]
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: newName, status: newStatus } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">
        <a href="/">TODO LIST PAGE APP</a>
      </h1>
      <div className="flex justify-end py-4">
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <TodoListTable
        tasks={tasks}
        setTasks={setTasks}
        isAddTask={isAddTask}
        setIsAddTask={setIsAddTask}
        addNewTask={addNewTask}
        updateTask={updateTask} // 수정 기능 추가
        deleteTask={deleteTask} // 삭제 기능 추가
      />
    </div>
  );
};

export default App;
