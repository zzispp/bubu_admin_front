import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateUser, getUserById } from '@/apis/user';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { listRole } from '@/apis/role';
import { MultiSelect } from "@/components/ui/multi-select";

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    type: 'update';
    onSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, initialData, type, onSuccess }) => {
    const [formData, setFormData] = useState<{
        id: string;
        name: string;
        email: string;
        roles: string[];
    }>({
        id: '',
        name: '',
        email: '',
        roles: []
    });

    const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        if (initialData?.id) {
            fetchUserData(initialData.id);
        }
        fetchRoleOptions();
    }, [initialData]);

    const fetchUserData = async (id: string) => {
        try {
            const data = await getUserById(id);
            if (data) {
                setFormData({
                    ...data,
                    roles: data.roles ? data.roles.map((role: any) => role.id) : []
                });
            } else {
                console.error('获取用户数据失败: 响应数据为空');
            }
        } catch (error) {
            console.error('获取用户数据失败:', error);
        }
    };

    const fetchRoleOptions = async () => {
        try {
            const data = await listRole({});
            if (data && data.roles) {
                const options = data.roles.map((role: any) => ({
                    value: role.id,
                    label: role.name
                }));
                setRoleOptions(options);
            } else {
                console.error('获取角色数据失败: 响应数据为空');
            }
        } catch (error) {
            console.error('获取角色数据失败:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (values: string[]) => {
        setFormData((prev) => ({ ...prev, roles: values }));
    };

    const handleSubmit = async () => {
        try {
            await updateUser(formData.id, formData);
            toast.success('用户更新成功');
            onClose();
            onSuccess();
        } catch (error) {
            console.error('用户操作失败:', error);
            toast.error('用户操作失败');
        }
    };

    console.log('当前角色:', formData.roles);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="user-form-description">
                <DialogHeader>
                    <DialogTitle>更新用户</DialogTitle>
                    <DialogDescription id="user-form-description">
                        请修改以下信息以更新用户
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">姓名</Label>
                        <Input id="name" name="name" value={formData.name || ''} onChange={handleChange} placeholder="姓名" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">邮箱</Label>
                        <Input id="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="邮箱" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="roles">角色</Label>
                    <MultiSelect
                        options={roleOptions}
                        onValueChange={handleRoleChange}
                        defaultValue={formData.roles}
                        placeholder="选择角色"
                    />
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={handleSubmit}>更新</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserForm;
