import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell,getKeyValue} from "@nextui-org/table";
const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "5",
    status: "300",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "3",
    status: "200",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "2",
    status: "135",
  },
  {
    key: "4",
    name: "William Howard",
    role: "1",
    status: "132",
  },
];

const columns = [
  {
    key: "name",
    label: "Process",
  },
  {
    key: "role",
    label: "CPU %",
  },
  {
    key: "status",
    label: "Ram",
  },  {
    key: "status",
    label: "Disk",
  }
];
export function RecentSales() {
  return (
    <div className="space-y-2 ">
          <Table aria-label="Example table with dynamic content "  className="border rounded">
      <TableHeader columns={columns} >
        {(column) => <TableColumn className="bg-accent rounded" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  )
}
