import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Employee } from '@/components/constants/data';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/layouts/page-container';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const breadcrumbItems = [
    { title: '仪表板', link: '/dashboard' },
    { title: '员工', link: '/dashboard/employee' }
];

export default function MenuManager() {
    const [searchParams] = useSearchParams();
    const [employee, setEmployee] = useState<Employee[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const page = Number(searchParams.get('page')) || 1;
    const pageLimit = Number(searchParams.get('limit')) || 10;
    const country = searchParams.get('search') || null;
    const offset = (page - 1) * pageLimit;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
                (country ? `&search=${country}` : '')
            );
            const employeeRes = await res.json();
            setTotalUsers(employeeRes.total_users);
            setPageCount(Math.ceil(employeeRes.total_users / pageLimit));
            setEmployee(employeeRes.users);
        };

        fetchData();
    }, [offset, pageLimit, country]);

    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-start justify-between">
                    <Heading
                        title={`员工 (${totalUsers})`}
                        description="管理员工（服务器端表格功能）"
                    />

                    <Link
                        to={'/dashboard/employee/new'}
                        className={cn(buttonVariants({ variant: 'default' }))}
                    >
                        <Plus className="mr-2 h-4 w-4" /> 添加新员工
                    </Link>
                </div>
                <Separator />

                <EmployeeTable
                    searchKey="country"
                    pageNo={page}
                    columns={columns}
                    totalUsers={totalUsers}
                    data={employee}
                    pageCount={pageCount}
                />
            </div>
        </PageContainer>
    );
}
