import { useMemo } from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/shared/components';
import { SidebarTrigger } from '../sidebar/Sidebar';
import { Link, useLocation } from 'react-router';
import NavbarActions from './NavbarActions';

const routeLabels = {
  '': 'Home',
  dashboard: 'Dashboard',
  products: 'Products',
  categories: 'Categories',
  settings: 'Settings',
  profile: 'Profile',
  docs: 'Documentation',
  components: 'Components',
  'delivery-orders': 'Breadcrumb',
};

// กำหนด pattern สำหรับ resource ที่มี dynamic ID
const resourcePatterns = [
  'delivery-orders',
  'purchase-orders',
  'products',
  'categories',
  'invoices',
  'customers',
  'orders',
  'users',
  // เพิ่ม resources ที่มี ID ต่อท้าย
];

// segments ที่เป็น action (ไม่ใช่ ID)
const knownActions = ['edit', 'view', 'new', 'create', 'delete', 'settings'];

export default function Navbar() {
  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const items = [];

    // เพิ่ม Home
    items.push({
      label: 'Home',
      path: '/',
      isLast: paths.length === 0,
    });

    // สร้าง items สำหรับแต่ละ segment
    paths.forEach((segment, index) => {
      const path = '/' + paths.slice(0, index + 1).join('/');
      const previousSegment = index > 0 ? paths[index - 1] : undefined;

      let label;

      const isIdSegment = previousSegment && 
                         resourcePatterns.includes(previousSegment) && 
                         !knownActions.includes(segment) &&
                         !routeLabels[segment as keyof typeof routeLabels];

      if (isIdSegment) {
        // แสดง ID แบบสั้นถ้ายาวเกินไป
        const displayId = segment.length > 10 ? `${segment.slice(0, 8)}...` : segment; //<-- เพิ่ม ลด จำนวนได้
                          // segment.length > 20 ? `${segment.slice(0, 19)}...` : segment;
        label = `#${displayId}`;
      } else {
        // ใช้ label จาก routeLabels หรือ capitalize
        label = routeLabels[segment as keyof typeof routeLabels] ||
                segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }

      items.push({
        label,
        path,
        isLast: index === paths.length - 1,
      });
    });

    return items;
  }, [location.pathname]);

  const shouldCollapse = breadcrumbItems.length > 3;
  const visibleItems = shouldCollapse
    ? [
        breadcrumbItems[0], // Home
        null, // Ellipsis placeholder
        ...breadcrumbItems.slice(-2), // 2 items สุดท้าย
      ]
    : breadcrumbItems;

  const hiddenItems = shouldCollapse ? breadcrumbItems.slice(1, -2) : [];

  return (
    <header className="z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <SidebarTrigger className="-ml-1 shrink-0" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 shrink-0"
          />

          {/* ซ่อน breadcrumb บน mobile, แสดงแค่ current page */}
          <Breadcrumb className="hidden md:block min-w-0 flex-1">
            <BreadcrumbList>
              {visibleItems.map((item) => {
                // Render ellipsis dropdown
                if (item === null) {
                  return (
                    <div key="ellipsis" className="flex items-center gap-2">
                      <BreadcrumbItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1">
                            <BreadcrumbEllipsis className="size-4" />
                            <span className="sr-only">Toggle menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {hiddenItems.map((hiddenItem) => (
                              <DropdownMenuItem key={hiddenItem.path}>
                                <Link to={hiddenItem.path}>
                                  {hiddenItem.label}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </div>
                  );
                }

                // Render breadcrumb item
                return (
                  <div key={item.path} className="flex items-center gap-2">
                    <BreadcrumbItem>
                      {item.isLast ? (
                        <BreadcrumbPage className="line-clamp-1">
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={item.path} className="line-clamp-1">
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!item.isLast && <BreadcrumbSeparator className="shrink-0" />}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>

          {/* แสดงแค่ current page บน mobile */}
          <div className="md:hidden min-w-0 flex-1">
            <p className="text-sm font-medium truncate">
              {breadcrumbItems[breadcrumbItems.length - 1]?.label}
            </p>
          </div>
        </div>

        <NavbarActions />
      </div>
    </header>
  );
}
