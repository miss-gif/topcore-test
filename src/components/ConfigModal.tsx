import { IInitData } from "@/types/type";
import RemoveModal from "./RemoveModal";
import { Button } from "./ui/button";

interface IConfigModal {
  task: IInitData;
  handleEditTask: (task: IInitData) => void;
  deleteTask: (id: string) => void;
}

const ConfigModal = ({ task, handleEditTask, deleteTask }: IConfigModal) => {
  return (
    <div className="fixed grid gap-1 p-1 border rounded-lg bg-neutral-50">
      <Button
        onClick={() => handleEditTask(task)}
        className="bg-blue-500 hover:bg-blue-600"
      >
        변경하기
      </Button>
      <RemoveModal label="삭제하기" deleteTask={deleteTask} task={task} />
    </div>
  );
};

export default ConfigModal;
