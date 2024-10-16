import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createRole, updateRole, getRoleByID } from '@/apis/role';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { listMenu } from '@/apis/menu';

interface RoleFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    type: 'create' | 'update';
    onSuccess: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ isOpen, onClose, initialData, type, onSuccess }) => {
    const [formData, setFormData] = useState<{
        id: string;
        code: string;
        name: string;
        description: string;
        sequence: number;
        status: string;
        menus: string[];
    }>({
        id: '',
        code: '',
        name: '',
        description: '',
        sequence: 1,
        status: 'enable',
        menus: []
    });

    const [treeData, setTreeData] = useState<DataNode[]>([]);

    useEffect(() => {
        if (type === 'update' && initialData?.id) {
            fetchRoleData(initialData.id);
        } else {
            setFormData({
                id: '',
                code: '',
                name: '',
                description: '',
                sequence: 1,
                status: 'enable',
                menus: []
            });
        }
        fetchMenuData();
    }, [type, initialData]);

    const fetchRoleData = async (id: string) => {
        try {
            const data = await getRoleByID(id);
            if (data) {
                setFormData({
                    ...data,
                    menus: data.menus ? extractMenuIds(data.menus) : []
                });
            } else {
                console.error('获取角色数据失败: 响应数据为空');
            }
        } catch (error) {
            console.error('获取角色数据失败:', error);
        }
    };

    const extractMenuIds = (menus: any[]): string[] => {
        let ids: string[] = [];
        menus.forEach(menu => {
            ids.push(menu.id);
            if (menu.children) {
                ids = [...ids, ...extractMenuIds(menu.children)];
            }
        });
        return ids;
    };

    const fetchMenuData = async () => {
        try {
            const data = await listMenu({});
            if (data && data.menus) {
                const adaptedTreeData = adaptMenuToTreeData(data.menus);
                setTreeData(adaptedTreeData);
            } else {
                console.error('获取菜单数据失败: 响应数据为空');
            }
        } catch (error) {
            console.error('获取菜单数据失败:', error);
        }
    };

    const adaptMenuToTreeData = (menus: any[]): DataNode[] => {
        return menus.map(menu => ({
            key: menu.id,
            title: menu.name,
            children: menu.children ? adaptMenuToTreeData(menu.children) : undefined
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMenuSelect = (selectedKeys: any, info: any) => {
        setFormData((prev) => ({ ...prev, menus: selectedKeys as string[] }));
    };

    const handleSubmit = async () => {
        try {
            if (type === 'create') {
                await createRole(formData);
                toast.success('角色创建成功');
            } else {
                await updateRole(formData, formData.id);
                toast.success('角色更新成功');
            }
            onClose();
            onSuccess();
        } catch (error) {
            console.error('角色操作失败:', error);
            toast.error('角色操作失败');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="role-form-description">
                <DialogHeader>
                    <DialogTitle>{type === 'create' ? '创建角色' : '更新角色'}</DialogTitle>
                    <DialogDescription id="role-form-description">
                        {type === 'create' ? '请填写以下信息以创建新角色' : '请修改以下信息以更新角色'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">名称</Label>
                        <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} placeholder="名称" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="code">代码</Label>
                        <Input id="code" name="code" value={formData.code || ''} onChange={handleChange} placeholder="代码" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">描述</Label>
                        <Input id="description" name="description" value={formData.description || ''} onChange={handleChange} placeholder="描述" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="sequence">序列</Label>
                        <Input id="sequence" name="sequence" type="number" value={formData.sequence || 1} onChange={handleChange} placeholder="序列" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="status">状态</Label>
                        <Select onValueChange={handleSelectChange('status')} value={formData.status || 'enable'}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="状态" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="enable">启用</SelectItem>
                                <SelectItem value="disable">禁用</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="menuIds">选择菜单</Label>
                    <Tree
                        checkable
                        onCheck={handleMenuSelect}
                        checkedKeys={formData.menus}
                        treeData={treeData}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={handleSubmit}>{type === 'create' ? '创建' : '更新'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RoleForm;
