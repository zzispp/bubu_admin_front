import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createMenu, updateMenu, getMenuByID } from '@/apis/menu';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface MenuFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    type: 'create' | 'update';
    onSuccess: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({ isOpen, onClose, initialData, type, onSuccess }) => {
    const [formData, setFormData] = useState({
        id: '',
        code: '',
        name: '',
        description: '',
        sequence: 1,
        type: 'nav',
        path: '',
        status: 'enable',
        parent_id: '',
        redirect: '',
        component: ''
    });

    useEffect(() => {
        if (type === 'update' && initialData?.id) {
            fetchMenuData(initialData.id);
        } else {
            setFormData(prevData => ({
                ...prevData,
                id:'',
                code: '',
                name: '',
                description: '',
                sequence: 1,
                type: 'nav',
                path: '',
                status: 'enable',
                redirect: '',
                component: '',
                parent_id: initialData?.parent_id || prevData.parent_id
            }));
        }
    }, [type, initialData]);

    const fetchMenuData = async (id: string) => {
        try {
            const data = await getMenuByID(id);
            if (data) {
                setFormData(data);
            } else {
                console.error('获取菜单数据失败: 响应数据为空');
            }
        } catch (error) {
            console.error('获取菜单数据失败:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (type === 'create') {
                await createMenu(formData);
                toast.success('菜单创建成功');
            } else {
                await updateMenu(formData, formData.id);
                toast.success('菜单更新成功');
            }
            onClose();
            onSuccess();
        } catch (error) {
            console.error('菜单操作失败:', error);
            toast.error('菜单操作失败');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent  aria-describedby="menu-form-description">
                <DialogHeader>
                    <DialogTitle>{type === 'create' ? '创建菜单' : '更新菜单'}</DialogTitle>
                    <DialogDescription id="menu-form-description">
                        {type === 'create' ? '请填写以下信息以创建新菜单' : '请修改以下信息以更新菜单'}
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
                        <Label htmlFor="type">类型</Label>
                        <Select onValueChange={handleSelectChange('type')} value={formData.type || 'nav'}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="类型" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nav">导航</SelectItem>
                                <SelectItem value="button">按钮</SelectItem>
                                <SelectItem value="page">页面</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="path">路径</Label>
                        <Input id="path" name="path" value={formData.path || ''} onChange={handleChange} placeholder="路径" />
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
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="redirect">重定向</Label>
                        <Input id="redirect" name="redirect" value={formData.redirect || ''} onChange={handleChange} placeholder="重定向" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="component">组件</Label>
                        <Input id="component" name="component" value={formData.component || ''} onChange={handleChange} placeholder="组件" />
                    </div>
                    <input type="hidden" name="parent_id" value={formData.parent_id} />
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={handleSubmit}>{type === 'create' ? '创建' : '更新'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MenuForm;