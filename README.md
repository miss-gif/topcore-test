# TODO LIST PAGE APP

## 개발 환경

- vite + React + TypeScript

## 스타일링

- Tailwind CSS
- shadcn/ui

## 기능 설명

### CRUD 기능

- **Add Task 버튼**: 생성 모드에 진입하여 input과 셀렉트 박스 값을 입력받습니다.

  - input의 최대 길이는 40자 이내입니다.
  - 간단한 유효성 검사와 메시지를 표시합니다.
  - 유효성 검사를 통과하지 못하면 저장할 수 없습니다.
  - 취소를 누르면 생성 모드가 닫힙니다.

- **config 아이콘 버튼**: 해당 아이템의 수정과 삭제 버튼이 포함된 모달이 뜹니다.

  - 모달 영역 밖을 클릭하면 모달이 닫힙니다. (적용 필요)
  - 변경하기 버튼을 누르면 수정 모드에 진입합니다.
  - 취소 버튼을 누르면 이전 작업 영역으로 돌아갑니다. 이때, config 모달은 닫히지 않습니다.
  - input에는 기존 text값을 불러오고, 셀렉트에도 기존 value값을 불러옵니다.
  - 저장하기 버튼을 누르면 내용이 업데이트됩니다. 이때는 config이 닫힙니다.
  - 변경된 내용이 없다면 코드는 작동하지 않습니다. (불필요한 낭비 방지) (적용 필요)

- **삭제하기 버튼**: 삭제 확인을 위한 컨펌 창이 뜨며, 취소를 누르면 창이 닫히고 삭제를 누르면 아이템이 삭제됩니다.

### 기타 기능

- 16자를 넘어가면 text는 "..."으로 변환됩니다.
- In Process, Done, IDEL는 뱃지로 표시되며, 각 색상이 다릅니다.

## TODO

- 모달 영역 밖을 클릭하면 모달이 닫히는 기능 적용 필요
- 변경된 내용이 없을 때 코드가 작동하지 않도록 하는 기능 적용 필요
