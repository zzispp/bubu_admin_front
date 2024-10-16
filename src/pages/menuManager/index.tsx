import { useState, useEffect } from 'react';
import { Menu } from '@/types/menu';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/layouts/page-container';
import { listMenu } from '@/apis/menu';
import { MenuTable } from '@/components/tables/menu-tables/menu-table';
import { columns } from '@/components/tables/menu-tables/columns';

export default function MenuManager() {
    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await listMenu({ page: 1, limit: 10 });
            setMenus(response.menus);
        } catch (error) {
            console.error('获取菜单列表失败:', error);
        }
    };



    return (
        <PageContainer>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Heading
                        title={`菜单管理 (${menus.length})`}
                        description="管理系统菜单"
                    />
                </div>
                <Separator />
                <MenuTable
                    columns={columns}
                    data={menus}
                    pageNo={1}
                    totalMenus={menus.length}
                    pageCount={1}
                    refreshData={fetchMenus}
                />
            </div>
        </PageContainer>
    );
}
