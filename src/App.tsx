import TodoListTable from "./components/TodoListTable";
import { Button } from "./components/ui/button";
import useTodo from "./hooks/use-Todo";

const App = () => {
  const {
    addNewTask,
    updateTask,
    deleteTask,
    tasks,
    isAddTask,
    handleOpenAddTask,
    handleCloseAddTask,
  } = useTodo();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">
        <a href="/">TODO LIST PAGE APP</a>
      </h1>
      <div className="flex justify-end py-4">
        <Button onClick={handleOpenAddTask}>Add Task</Button>
      </div>
      <TodoListTable
        tasks={tasks} // todo 데이터
        isAddTask={isAddTask} // AddTask 모드 상태
        handleCloseAddTask={handleCloseAddTask} // AddTask 모드 닫기
        addNewTask={addNewTask}
        updateTask={updateTask} // 수정 기능 추가
        deleteTask={deleteTask} // 삭제 기능 추가
      />
    </div>
  );
};

export default App;
