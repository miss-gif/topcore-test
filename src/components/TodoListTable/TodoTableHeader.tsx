import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TodoTableHeader = () => {
  const headers = [
    { label: "#", className: "w-32" },
    { label: "Task Name", className: "" },
    { label: "Status", className: "w-36" },
    { label: "Config", className: "w-32" },
  ];

  return (
    <TableHeader className="border-b-2 border-neutral-700">
      <TableRow>
        {headers.map((header, index) => (
          <TableHead
            key={index}
            className={`text-center text-neutral-700 font-semibold ${header.className}`}
          >
            {header.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TodoTableHeader;
