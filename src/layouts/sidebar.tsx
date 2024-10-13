import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { DashboardNav } from './dashboard-nav';
import { userStore } from '@/stores/user';
import Logo from '@/components/ui/logo';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const { user } = userStore();
  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={`relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block ${!isMinimized ? 'w-72' : 'w-[72px]'} ${className}`}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Logo showText={!isMinimized} size={!isMinimized ? 36 : 30} />
      </div>
      <ChevronLeft
        className={`absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground ${isMinimized ? 'rotate-180' : ''}`}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={user?.menus || []} />
          </div>
        </div>
      </div>
    </aside>
  );
}
