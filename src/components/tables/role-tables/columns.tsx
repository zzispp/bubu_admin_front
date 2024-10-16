import { ColumnDef } from '@tanstack/react-table';
import { Role } from '@/types/role';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Role>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="全选"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="选择行"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: '名称'
  },
  {
    accessorKey: 'code',
    header: '代码'
  },
  {
    accessorKey: 'description',
    header: '描述'
  },
  {
    accessorKey: 'status',
    header: '状态'
  },
];
