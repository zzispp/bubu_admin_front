import { useState, useEffect } from 'react';
import { Role } from '@/types/role';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/layouts/page-container';
import { RoleTable } from '@/components/tables/role-tables/role-table';
import { columns } from '@/components/tables/role-tables/columns';
import { listRole } from '@/apis/role';

export default function RoleManager() {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await listRole({ page: 1, limit: 10 });
            setRoles(response.roles);
        } catch (error) {
            console.error('获取角色列表失败:', error);
        }
    };

    return (
        <PageContainer>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Heading
                        title={`角色管理 (${roles.length})`}
                        description="管理系统角色"
                    />
                </div>
                <Separator />
                <RoleTable
                    columns={columns}
                    data={roles}
                    pageNo={1}
                    totalRoles={roles.length}
                    pageCount={1}
                    refreshData={fetchRoles}
                />
            </div>
        </PageContainer>
    );
}
