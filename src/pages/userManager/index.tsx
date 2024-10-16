import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/layouts/page-container';
import { UserTable } from '@/components/tables/user-tables/user-table';
import { columns } from '@/components/tables/user-tables/columns';
import { listUser } from '@/apis/user';

export default function UserManager() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await listUser({  });
            setUsers(response.users);
        } catch (error) {
            console.error('获取用户列表失败:', error);
        }
    };

    return (
        <PageContainer>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Heading
                        title={`用户管理 (${users.length})`}
                        description="管理系统用户"
                    />
                </div>
                <Separator />
                <UserTable
                    columns={columns}
                    data={users}
                    pageNo={1}
                    totalUsers={users.length}
                    pageCount={1}
                    refreshData={fetchUsers}
                />
            </div>
        </PageContainer>
    );
}
