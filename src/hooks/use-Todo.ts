import { initData } from "@/mocks/initData";
import { IInitData } from "@/types/type";
import { useRef, useState } from "react";

const useTodo = () => {
  const [tasks, setTasks] = useState(initData); // todo list 데이터
  const [isAddTask, setIsAddTask] = useState(false); // AddTask 모드 상태
  const taskIdRef = useRef(4);

  // AddTask 모드로 변경
  const handleOpenAddTask = () => {
    setIsAddTask(true);
  };

  // AddTask 모드 닫기
  const handleCloseAddTask = () => {
    setIsAddTask(false);
  };

  // 추가 기능 추가
  const addNewTask = (taskName: string, taskStatus: IInitData["status"]) => {
    const newTask: IInitData = {
      id: taskIdRef.current.toString().padStart(2, "0"),
      name: taskName,
      status: taskStatus,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // tasks 배열에 새로운 task 추가
    taskIdRef.current += 1; // 다음 작업 ID 증가
    handleCloseAddTask();
  };

  // 수정 기능 추가
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

  // 삭제 기능 추가
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return {
    addNewTask,
    updateTask,
    deleteTask,
    tasks,
    setTasks,
    isAddTask,
    setIsAddTask,
    handleOpenAddTask,
    handleCloseAddTask,
  };
};

export default useTodo;
