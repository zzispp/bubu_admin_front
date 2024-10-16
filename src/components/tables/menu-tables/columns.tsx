import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Menu } from '@/types/menu';

export const columns: ColumnDef<Menu>[] = [
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
        onCheckedChange={(value:any) => row.toggleSelected(!!value)}
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
    accessorKey: 'path',
    header: '路径'
  },
  {
    accessorKey: 'type',
    header: '类型'
  },
  {
    accessorKey: 'status',
    header: '状态'
  },
  {
    accessorKey: 'sequence',
    header: '序列'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
