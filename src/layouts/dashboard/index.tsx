import Sidebar from '@/layouts/sidebar';
import React from 'react';
import Header from '../header';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                <Header />
                <Outlet/>
            </main>
        </div>
    );
};

export default DashboardLayout;
