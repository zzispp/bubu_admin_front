import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getExpandedRowModel
} from '@tanstack/react-table';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon as ChevronRightIconLucide, Plus, Edit, Trash } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MenuForm from '@/pages/menuManager/form';
import { Badge } from '@/components/ui/badge';
import { deleteMenu } from '@/apis/menu';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageNo: number;
  totalMenus: number;
  pageSizeOptions?: number[];
  pageCount: number;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  refreshData: () => Promise<void>;
}

export function MenuTable<TData, TValue>({
  columns,
  data,
  pageNo,
  totalMenus,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  refreshData
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update'>('create');
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null);

  // 搜索参数
  const page = searchParams.get('page') ?? '1';
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams.get('limit') ?? '10';
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  // 创建查询字符串
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // 处理服务器端分页
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage
    });

  React.useEffect(() => {
    navigate(
      `${location.pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize
      })}`,
      { replace: true }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      pagination: { pageIndex, pageSize }
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
  });

  const handleNodeExpand = (nodeId: string) => {
    setExpandedNodes((prevExpanded) => {
      if (prevExpanded.includes(nodeId)) {
        return prevExpanded.filter((id) => id !== nodeId);
      } else {
        return [...prevExpanded, nodeId];
      }
    });
  };

  const handleAddSubMenu = (parentNode: any) => {
    setModalType('create');
    setSelectedMenu({ parent_id: parentNode.id });
    setIsModalOpen(true);
  };

  const handleAddRootMenu = () => {
    setModalType('create');
    setSelectedMenu({ parent_id: 'root' });
    setIsModalOpen(true);
  };

  const handleEditMenu = (node: any) => {
    setModalType('update');
    setSelectedMenu(node);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const handleSuccess = async () => {
    // 刷新数据
    await refreshData();
  };

  const handleDeleteMenu = async (id: string) => {
    try {
      await deleteMenu(id);
      toast.success('菜单删除成功');
      await refreshData();
    } catch (error) {
      console.error('删除菜单失败:', error);
    }
    setIsDeleteDialogOpen(false);
    setMenuToDelete(null);
  };

  const openDeleteDialog = (id: string) => {
    setMenuToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const renderTreeNode = (node: any, depth: number = 0) => {
    return (
      <React.Fragment key={node.id}>
        <TableRow data-state={node.getIsSelected && node.getIsSelected() && 'selected'}>
          <TableCell>
            <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 20}px` }}>
              <div className="cursor-pointer" onClick={() => handleNodeExpand(node.id)}>
                {node.children && node.children.length > 0 ? (
                  expandedNodes.includes(node.id) ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )
                ) : null}
              </div>
              <span>{node.name}</span>
            </div>
          </TableCell>
          <TableCell>{node.description}</TableCell>
          <TableCell>{node.path}</TableCell>
          <TableCell>{node.component}</TableCell>
          <TableCell>{node.icon}</TableCell>
          <TableCell>
            <Badge variant={node.status === 'enable' ? 'default' : 'destructive'}>
              {node.status === 'enable' ? '启用' : '禁用'}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleAddSubMenu(node)}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleEditMenu(node)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(node.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {expandedNodes.includes(node.id) && node.children && node.children.map((child: any) => renderTreeNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <Button onClick={handleAddRootMenu}>
          <Plus className="mr-2 h-4 w-4" /> 新增根菜单
        </Button>
      </div>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>路径</TableHead>
              <TableHead>组件</TableHead>
              <TableHead>图标</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((node: any) => renderTreeNode(node))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            共 {table.getFilteredRowModel().rows.length} 行。
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                每页行数
              </p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value: any) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            第 {table.getState().pagination.pageIndex + 1} 页，共{' '}
            {table.getPageCount()} 页
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="转到第一页"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="转到上一页"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="转到下一页"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIconLucide className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="转到最后一页"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <MenuForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
        initialData={selectedMenu}
        onSuccess={handleSuccess}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除此菜单吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => menuToDelete && handleDeleteMenu(menuToDelete)}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}