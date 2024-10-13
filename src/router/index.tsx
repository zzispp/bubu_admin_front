import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, useRoutes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { userStore } from '@/stores/user';
import { Loader2 } from 'lucide-react';
import MenuManager from '@/pages/menuManager';

// 动态导入组件
const modules = import.meta.glob("../pages/**/*.tsx") as any;
// 动态导入layouts
const layouts = import.meta.glob("../layouts/**/*.tsx") as any;
console.log(layouts)
// 静态导入组件
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const Home = lazy(() => import('@/pages/home'));

// 路由配置数组
const staticRoutes = [
    {
        path: '/',
        element: <Home />,
    },
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
        element: <div>404</div>,
    },
    {
        path: '*',
        element: <Navigate to="/404" replace />,
    },
    {
        path: '/menu',
        element:<MenuManager/>
    }
];

const LoadingSpinner = React.memo(() => (
    <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
));

const Routes: React.FC = () => {
    const { user, token, getProfile } = userStore();
    const navigate = useNavigate();
    const location = useLocation();

    // 每次渲染时获取最新的用户信息
    React.useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                await getProfile();
                if (location.pathname === '/login' || location.pathname === '/register') {
                    navigate('/dashboard');
                }
            }
        };
        fetchProfile();
    }, [token, getProfile, navigate, location.pathname]);

    const renderElement = useMemo(() => (route: any) => (
        <Suspense fallback={<LoadingSpinner />}>
            {React.createElement(lazy(() => {
                if (route.component) {
                    const componentPath = route.component;
                    console.log("componentPath", `../layouts/${componentPath.split('/').slice(1).join('/')}/index.tsx`);
                    if (componentPath.startsWith('pages/') && modules[`../pages/${componentPath.split('/').slice(1).join('/')}/index.tsx`]) {
                        return modules[`../pages/${componentPath.split('/').slice(1).join('/')}/index.tsx`]();
                    } else if (componentPath.startsWith('layouts/') && layouts[`../layouts/${componentPath.split('/').slice(1).join('/')}/index.tsx`]) {
                        return layouts[`../layouts/${componentPath.split('/').slice(1).join('/')}/index.tsx`]();
                    }
                }
                return Promise.resolve({ default: () => <div className='w-full h-full flex items-center justify-center'>未匹配到组件，请检查菜单组件路径是否有误</div> });
            }))}
        </Suspense>
    ), []);

    const generateRouter = useMemo(() => (item: any) => {
        const router: any = {
            path: item.path,
            element: renderElement(item),
        };

        if (item.redirect) {
            router.children = [
                {
                    index: true,
                    element: <Navigate to={item.redirect} replace />
                }
            ];
        }

        if (item.children) {
            router.children = [...(router.children || []), ...item.children.map((child: any) => generateRouter({
                ...child,
                path: `${item.path}${child.path}`
            }))];
        }

        return router;
    }, [renderElement]);

    const dynamicRoutes = useMemo(() => user?.menus ? user.menus.map((item: any) => generateRouter(item)) : [], [user?.menus, generateRouter]);

    // 将动态路由添加到顶层路由中
    const allRoutes = useMemo(() => [...staticRoutes, ...dynamicRoutes], [dynamicRoutes]);
    console.log("allRoutes", allRoutes);
    const element = useRoutes(allRoutes);

    return element;
};

const DynamicRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
};

export default DynamicRouter;