import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IInitData } from "@/types/type";
import { Settings } from "lucide-react";
import { useRef, useState } from "react";
import AddTask from "./AddTask";
import ConfigModal from "./ConfigModal";
import TodoTableHeader from "./TodoListTable/TodoTableHeader";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ITodoListTable {
  tasks: IInitData[];
  isAddTask: boolean;
  handleCloseAddTask: () => void;
  addNewTask: (taskName: string, taskStatus: IInitData["status"]) => void;
  updateTask: (
    id: string,
    newName: string,
    newStatus: IInitData["status"]
  ) => void;
  deleteTask: (id: string) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  openModalTaskId: string | null;
  setOpenModalTaskId: (id: string | null) => void;
}

const TodoListTable = ({
  tasks,
  isAddTask,
  handleCloseAddTask,
  addNewTask,
  updateTask,
  deleteTask,
  editingTaskId,
  setEditingTaskId,
  openModalTaskId,
  setOpenModalTaskId,
}: ITodoListTable) => {
  const [editTaskName, setEditTaskName] = useState<string>("");
  const [editTaskStatus, setEditTaskStatus] = useState<IInitData["status"]>("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       setOpenModalTaskId(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [setOpenModalTaskId]);

  // 수정 기능 추가
  const handleEditTask = (task: IInitData) => {
    setEditingTaskId(task.id);
    setEditTaskName(task.name);
    setEditTaskStatus(task.status);
  };

  // 저장 기능 추가
  const handleSaveEdit = () => {
    if (editingTaskId) {
      updateTask(editingTaskId, editTaskName, editTaskStatus);
      setEditingTaskId(null);
    }
  };

  // 취소 기능
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setOpenModalTaskId(null);
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
                      onClick={() => {
                        setOpenModalTaskId(
                          openModalTaskId === task.id ? null : task.id
                        );
                        handleCloseAddTask();
                      }}
                    >
                      <Settings
                        className={`${
                          openModalTaskId === task.id && "text-blue-500"
                        }`}
                      />
                    </Button>
                  </TableCell>
                  {openModalTaskId === task.id && (
                    <div ref={modalRef} className="absolute -my-2 right-28">
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
            <AddTask
              handleCloseAddTask={handleCloseAddTask}
              addNewTask={addNewTask}
            />
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TodoListTable;
