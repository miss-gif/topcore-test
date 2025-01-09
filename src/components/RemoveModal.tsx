import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { IInitData } from "@/types/type";

interface IRemoveModal {
  label: string;
  task: IInitData;
  deleteTask: (id: string) => void;
}

const RemoveModal = ({ label, deleteTask, task }: IRemoveModal) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-red-500 text-white p-2 rounded-md">
        {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="min-h-20">
            삭제한 데이터는 복구할 수 없습니다.
          </DialogDescription>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-blue-500"
                onClick={() => deleteTask(task.id)}
              >
                삭제
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveModal;
