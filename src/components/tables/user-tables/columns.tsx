import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/user';
import { Checkbox } from '@/components/ui/checkbox';
import dayjs from 'dayjs';
export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: '用户名'
  },
  {
    accessorKey: 'email',
    header: '邮箱'
  },
  {
    accessorKey: 'created_at',
    header: '创建时间',
    cell: ({ row }) => (
      <div>{dayjs(row.original.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
    )
  },
  {
    accessorKey: 'updated_at',
    header: '更新时间',
    cell: ({ row }) => (
      <div>{dayjs(row.original.updated_at).format('YYYY-MM-DD HH:mm:ss')}</div>
    )
  },
  {
    accessorKey: 'roles',
    header: '角色',
    cell: ({ row }) => (
      <div>{row.original.roles?.map(role => role.name).join(', ')}</div>
    )
  }
];
