import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@/types/menu';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardNavProps {
  items: Menu[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const location = useLocation();
  const path = location.pathname;
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  const renderNavItems = (navItems: Menu[]) => {
    return navItems.map((item, index) => {
      if (item.type !== 'nav') return null;

      const Icon = Icons[item.icon as keyof typeof Icons] || Icons.arrowRight;
      const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

      const hasChildren = item.children && item.children.length > 0;

      return (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <div
              className={cn(
                'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer',
                path === item.path ? 'bg-accent' : 'transparent',
              )}
              onClick={() => {
                if (!isMinimized) {
                  if (setOpen) setOpen(false);
                  setIsSubMenuOpen(!isSubMenuOpen);
                }
              }}
            >
              <Icon className={`ml-3 size-5 flex-none`} />
              {isMobileNav || !isMinimized ? (
                <span className="mr-2 truncate">{item.name}</span>
              ) : null}
              {hasChildren && !isMinimized && (
                <ChevronDown className={`ml-auto mr-2 size-4 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`} />
              )}
            </div>
          </PopoverTrigger>
          {isMinimized && hasChildren && (
            <PopoverContent
              align="start"
              side="right"
              className="p-0 w-48"
            >
              <div className="flex flex-col py-2">
                {item.children && item.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    to={`${item.path || ''}${child.path || '#'}`}
                    className="text-sm hover:bg-accent hover:text-accent-foreground py-2 px-4"
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </PopoverContent>
          )}
          <AnimatePresence>
            {hasChildren && isSubMenuOpen && !isMinimized && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 mt-1 bg-accent/10 rounded-md flex flex-col gap-1 overflow-hidden"
              >
                {item.children && item.children.map((child, childIndex) => {
                  const ChildIcon = Icons[child.icon as keyof typeof Icons] || Icons.arrowRight;
                  return (
                    <Link
                      key={childIndex}
                      to={`${item.path || ''}${child.path || '#'}`}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        path === `${item.path || ''}${child.path}` ? 'bg-accent' : 'transparent',
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                    >
                      <ChildIcon className={`ml-3 size-4 flex-none`} />
                      <span className="mr-2 truncate">{child.name}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </Popover>
      );
    });
  };

  return (
    <nav className="grid items-start gap-2">
      {renderNavItems(items)}
    </nav>
  );
}
