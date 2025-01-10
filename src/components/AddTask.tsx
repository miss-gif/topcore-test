import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "./ui/button";
import { IInitData } from "@/types/type";

interface AddTaskProps {
  handleCloseAddTask: () => void;
  addNewTask: (taskName: string, taskStatus: IInitData["status"]) => void;
}

const AddTask = ({ handleCloseAddTask, addNewTask }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState<IInitData["status"] | string>(
    ""
  );

  // 유효성 검사
  const isTaskNameValid = taskName.trim().length > 0 && taskName.length <= 40;
  // 상태 선택 여부
  const isStatusSelected = taskStatus !== "";
  // 유효성 검사 결과
  const isFormValid = isTaskNameValid && isStatusSelected;

  // 저장 버튼 클릭시, 유효성 검사 후, 데이터 추가
  const handleAddTask = () => {
    if (isFormValid) {
      addNewTask(taskName.trim(), taskStatus as IInitData["status"]);
      handleCloseAddTask();
    }
  };

  // 글쓰기 모드에서 취소버튼 눌렀을때, 값 비우고 모드 종료
  const handleCancel = () => {
    setTaskName("");
    setTaskStatus("");
    handleCloseAddTask();
  };

  return (
    <TableRow>
      <TableCell className="text-center">
        <Button onClick={handleCancel} className="text-xs">
          취소
        </Button>
      </TableCell>

      {/* 이름 입력 필드 */}
      <TableCell className="px-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="40자 이내 입력 가능합니다."
          className={`w-full p-2 border ${
            isTaskNameValid
              ? "border-neutral-300"
              : "border-red-500 text-red-500"
          } rounded-md`}
        />
        {!isTaskNameValid && (
          <p className="text-red-500 text-xs mt-1">40자 이내로 입력해주세요.</p>
        )}
      </TableCell>

      {/* 상태 선택 컴포넌트 */}
      <TableCell>
        <Select
          onValueChange={(value) => setTaskStatus(value as IInitData["status"])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Combbox" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IDLE">IDLE</SelectItem>
            <SelectItem value="IN PROCESS">IN PROCESS</SelectItem>
            <SelectItem value="DONE">DONE</SelectItem>
          </SelectContent>
        </Select>
        {!isStatusSelected && (
          <p className="text-red-500 text-xs mt-1">상태를 선택해주세요.</p>
        )}
      </TableCell>

      {/* 저장 버튼 */}
      <TableCell className="text-center">
        <Button
          onClick={handleAddTask}
          className="text-xs"
          disabled={!isFormValid}
        >
          저장하기
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AddTask;
