import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IInitData } from "@/types/type";
import { Settings } from "lucide-react";
import { useState } from "react";
import AddTask from "./AddTask";
import ConfigModal from "./ConfigModal";
import TodoTableHeader from "./TodoListTable/TodoTableHeader";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ITodoListTable {
  tasks: IInitData[];
  setTasks: (value: IInitData[]) => void;
  isAddTask: boolean;
  setIsAddTask: (value: boolean) => void;
  addNewTask: (taskName: string, taskStatus: IInitData["status"]) => void;
  updateTask: (
    id: string,
    newName: string,
    newStatus: IInitData["status"]
  ) => void;
  deleteTask: (id: string) => void;
}

const TodoListTable = ({
  tasks,
  isAddTask,
  setIsAddTask,
  addNewTask,
  updateTask,
  deleteTask,
}: ITodoListTable) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>("");
  const [editTaskStatus, setEditTaskStatus] = useState<IInitData["status"]>("");

  const [openModalTaskId, setOpenModalTaskId] = useState<string | null>(null);

  const handleEditTask = (task: IInitData) => {
    setEditingTaskId(task.id);
    setEditTaskName(task.name);
    setEditTaskStatus(task.status);
  };

  const handleSaveEdit = () => {
    if (editingTaskId) {
      updateTask(editingTaskId, editTaskName, editTaskStatus);
      setEditingTaskId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const taskStatusColor = {
    IDLE: "bg-blue-700",
    "IN PROCESS": "bg-green-700",
    DONE: "bg-red-700",
    "": "",
  };

  return (
    <>
      <Table>
        <TodoTableHeader />

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              {editingTaskId === task.id ? (
                <TableCell className="text-center">
                  <Button onClick={handleCancelEdit} className="text-xs">
                    취소
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="text-center">{task.id}</TableCell>
              )}

              {/* Edit Mode */}
              {editingTaskId === task.id ? (
                <>
                  <TableCell className="px-2">
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      value={editTaskStatus}
                      onChange={(e) =>
                        setEditTaskStatus(e.target.value as IInitData["status"])
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="IDLE">IDLE</option>
                      <option value="IN PROCESS">IN PROCESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => {
                        handleSaveEdit();
                        setOpenModalTaskId(
                          openModalTaskId === task.id ? null : task.id
                        );
                      }}
                      className="text-xs"
                    >
                      저장하기
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="px-2">
                    {task.name.length > 16
                      ? `${task.name.slice(0, 16)}...`
                      : task.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`w-full justify-center ${
                        taskStatusColor[task.status]
                      }`}
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center flex justify-center space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setOpenModalTaskId(
                          openModalTaskId === task.id ? null : task.id
                        )
                      }
                    >
                      <Settings />
                    </Button>
                  </TableCell>
                  {openModalTaskId === task.id && (
                    <div className="fixed">
                      <ConfigModal
                        task={task}
                        handleEditTask={handleEditTask}
                        deleteTask={deleteTask}
                      />
                    </div>
                  )}
                </>
              )}
            </TableRow>
          ))}
          {isAddTask && (
            <AddTask setIsAddTask={setIsAddTask} addNewTask={addNewTask} />
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TodoListTable;
