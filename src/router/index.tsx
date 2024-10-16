import React, { lazy, Suspense, useMemo, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { userStore } from '@/stores/user';
import { Loader2 } from 'lucide-react';
import Login from '@/pages/login';
import Register from '@/pages/register';
import DashboardLayout from '@/layouts/dashboard';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';

// 动态导入组件
const modules = import.meta.glob("../pages/**/*.tsx");

const LoadingSpinner = React.memo(() => (
    <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
));


const DynamicRouter: React.FC = () => {
    const { user, token, getProfile } = userStore();
    const [components, setComponents] = useState<Map<string, any>>(new Map());
    const [router, setRouter] = useState<any>(null);

    // 获取用户信息和菜单数据
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await getProfile();
            }
        };
        fetchData();
    }, [token, getProfile]);

    // 动态加载组件
    useEffect(() => {
        const loadComponents = async () => {
            const componentMap = new Map<string, any>();
            const loadComponent = async (menu: any, parentPath = '') => {
                const fullPath = `${parentPath}${menu.path}`;
                if (menu.component && menu.component !== 'Layout') {
                    let componentModule;
                    if (menu.component.startsWith('pages/') && modules[`../pages/${menu.component.split('/').slice(1).join('/')}/index.tsx`]) {
                        componentModule = () => modules[`../pages/${menu.component.split('/').slice(1).join('/')}/index.tsx`]();
                    } 

                    if (componentModule) {
                        const component = lazy(() => componentModule().then((module: any) => ({ default: module.default })));
                        componentMap.set(fullPath, component);
                    } else {
                        const NotFoundComponent = () => <div>组件未找到: {menu.component}</div>;
                        componentMap.set(fullPath, NotFoundComponent);
                        console.warn(`找不到组件: ${menu.component}，已创建默认组件`);
                    }
                }
                if (menu.children) {
                    for (const child of menu.children) {
                        await loadComponent(child, fullPath);
                    }
                }
            };
            if (user?.menus) {
                for (const menu of user.menus) {
                    await loadComponent(menu);
                }
            }
            setComponents(componentMap);
        };
        loadComponents();
    }, [user?.menus]);

    // 生成路由配置
    const generateRouter = useMemo(() => {
        const generateRouterRecursive = (item: any, parentPath = ''): any => {
            const itemPath = item.path.startsWith('/') ? item.path.slice(1) : item.path;
            const fullPath = `${parentPath}/${itemPath}`.replace(/\/+/g, '/');
            
            const router: any = {
                path: itemPath,
                element: components.get(fullPath) ? 
                    <Suspense fallback={<LoadingSpinner />}>
                        {React.createElement(components.get(fullPath))}
                    </Suspense> : 
                    null,
            };

            if (item.redirect) {
                router.children = [
                    { index: true, element: <Navigate to={item.redirect} replace /> }
                ];
            }

            if (item.children) {
                router.children = [
                    ...(router.children || []),
                    ...item.children.map((child: any) => generateRouterRecursive(child, fullPath))
                ];
            }

            return router;
        };

        return generateRouterRecursive;
    }, [components]);

    // 创建路由
    useEffect(() => {
        const baseRoutes = [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/404',
                element: <NotFound />,
            },
            {
                path: '*',
                element: <Navigate to="/404" replace />,
            },
        ];

        let routes;
        if (token && user?.menus && user.menus.length > 0) {
            const dynamicRoutes = user.menus.map(menu => generateRouter(menu, ''));
            routes = [
                {
                    path: '/',
                    element: <DashboardLayout />,
                    children: [
                        { index: true, element: dynamicRoutes[0] ? <Navigate to={dynamicRoutes[0].path} replace /> : <Navigate to="/404" replace /> },
                        ...dynamicRoutes,
                    ],
                },
                ...baseRoutes,
            ];
        } else {
            routes = [
                {
                    path: '/',
                    element: <Home />,
                },
                ...baseRoutes,
            ];
        }
        
        const newRouter = createBrowserRouter(routes);
        setRouter(newRouter);
    }, [components, user?.menus, generateRouter, token]);

    if (!router) {
        return <LoadingSpinner />;
    }

    return <RouterProvider router={router} />;
};

export default DynamicRouter;
