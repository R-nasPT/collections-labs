"use client";

import { Link, usePathname } from "@/navigation";
import { useSidebarMenu } from "@/constants";
import { cn } from "@/utils";
import { GoDot, GoDotFill, MdKeyboardArrowRight, RiMenuFoldLine } from "@/lib/icons";
import { Accordion } from "@/components/ui";
import MenuButton from "./menu-button";
import { useState, useEffect, useRef } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onCollapse: () => void;
}

export default function Sidebar({ isOpen, isCollapsed, onClose, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { MAIN_MENU, SUB_MENU, DASHBOARD_MENU } = useSidebarMenu();
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Adjust popup positioning based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Don't reset popup on scroll, just let it stay in place
      // The fixed positioning will keep it aligned properly
    };

    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener("scroll", handleScroll);
      return () => sidebarElement.removeEventListener("scroll", handleScroll);
    }
  }, [activePopup]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
    setActivePopup(null); // Close popup after click
  };

  const handleMouseEnter = (menuKey: string) => {
    // Clear any pending timer
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
    
    // Set active popup immediately
    setActivePopup(menuKey);
  };

  const handleMouseLeave = (menuKey: string) => {
    // ไม่ต้องปิด popup ทันทีเมื่อเมาส์ออกจาก menu item
    // เราจะยังไม่ตั้ง timer ให้ปิด เพื่อให้ผู้ใช้มีเวลาเลื่อนเมาส์ไปที่ popup
  };

  // เพิ่มฟังก์ชันใหม่สำหรับจัดการ mouseLeave บนส่วนของ menu item และ popup พร้อมกัน
  const handleMenuContainerLeave = () => {
    // ตั้ง timer ให้ปิด popup เมื่อเมาส์ออกไปจากพื้นที่ทั้งหมด
    popupTimerRef.current = setTimeout(() => {
      setActivePopup(null);
    }, 150); // เพิ่มเวลาเล็กน้อยเพื่อให้ผู้ใช้มีเวลาเลื่อนเมาส์
  };

  const handlePopupMouseEnter = () => {
    // Clear close timer when mouse enters popup
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
  };

  const handlePopupMouseLeave = (menuKey: string) => {
    // ใช้ function เดียวกับการออกจากพื้นที่ทั้งหมด
    handleMenuContainerLeave();
  };

  const isSubmenuActive = (menu: any) => {
    return menu.sub_menu?.some((sub: any) => sub.path === pathname);
  };

  const renderSubMenuPopup = (menu: any) => {
    if (!isCollapsed || activePopup !== menu.key) return null;

    // Find the menu item's DOM element position
    const menuElement = document.getElementById(`menu-${menu.key}`);
    const topOffset = menuElement ? menuElement.getBoundingClientRect().top : 0;

    return (
      <div 
        className="fixed left-16 z-50 w-48 bg-white rounded-md shadow-lg py-2"
        style={{ top: `${topOffset}px` }}
        onMouseEnter={handlePopupMouseEnter}
        onMouseLeave={() => handlePopupMouseLeave(menu.key)}
      >
        <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
          {menu.label}
        </div>
        <div className="py-1">
          {menu.sub_menu.map((sub: any) => (
            <Link
              key={sub.key}
              href={sub.path}
              onClick={handleMenuClick}
              className={cn(
                "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#783cf1]",
                pathname === sub.path && "text-[#783cf1] bg-[#7645D914]"
              )}
            >
              {sub.labelSide}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderCollapsedMenuItem = (menu: any) => {
    const IconComponent = menu.icon;
    const isActive = pathname === menu.path;
    const isParentActive = isSubmenuActive(menu);

    if (menu.sub_menu) {
      return (
        <div
          key={menu.key}
          id={`menu-${menu.key}`}
          className="relative"
          onMouseEnter={() => handleMouseEnter(menu.key)}
          onMouseLeave={() => handleMenuContainerLeave()}
        >
          <div
            className={cn(
              "w-full py-3 px-2 flex justify-center cursor-pointer transition-colors duration-300 group",
              (isActive || isParentActive)
                ? "bg-[#7645D914] text-[#783cf1]"
                : "hover:bg-[#7645D914] hover:text-[#783cf1]"
            )}
            title={menu.label}
          >
            <IconComponent 
              className={cn(
                "w-6 h-6 transition-all duration-300",
                isActive || isParentActive ? "text-[#783cf1]" : "text-gray-400 group-hover:text-[#783cf1]"
              )} 
            />
          </div>
          {renderSubMenuPopup(menu)}
        </div>
      );
    }

    return (
      <Link
        key={menu.key}
        href={menu.path}
        onClick={handleMenuClick}
        className={cn(
          "py-3 px-2 flex justify-center cursor-pointer transition-colors duration-300 group",
          (isActive || isParentActive)
            ? "bg-[#7645D914] text-[#783cf1]"
            : "hover:bg-[#7645D914] hover:text-[#783cf1]"
        )}
        title={menu.labelSide}
      >
        <IconComponent 
          className={cn(
            "w-6 h-6 transition-all duration-300",
            isActive || isParentActive ? "text-[#783cf1]" : "text-gray-400 group-hover:text-[#783cf1]"
          )} 
        />
      </Link>
    );
  };

  const renderMenuItem = (menu: any, isSubMenu = false) => {
    if (isCollapsed && !isSubMenu) {
      return renderCollapsedMenuItem(menu);
    }

    const IconComponent = menu.icon;
    const isActive = pathname === menu.path;
    const isParentActive = isSubmenuActive(menu);

    return (
      <Link
        key={menu.key}
        href={menu.path}
        onClick={handleMenuClick}
        className={cn(
          "cursor-pointer transition-colors duration-300 group",
          isSubMenu 
            ? cn(
                "py-2 px-10 flex flex-col text-sm duration-150 text-gray-600",
                isActive 
                  ? "border-l-2 border-[#783cf1] text-[#783cf1] bg-white" 
                  : "hover:bg-gray-50 hover:text-[#783cf1]"
              )
            : cn(
                "py-3 px-5 flex items-center gap-5 text-gray-700",
                (isActive || isParentActive)
                  ? "bg-[#7645D914] text-[#783cf1] font-medium shadow-sm" 
                  : "hover:bg-[#7645D914] hover:text-[#783cf1] hover:font-medium hover:shadow-sm"
              )
        )}
      >
        {!isSubMenu && (
          <IconComponent 
            className={cn(
              "w-6 h-6 transition-all duration-300",
              isActive || isParentActive ? "text-[#783cf1]" : "text-gray-400 group-hover:text-[#783cf1]"
            )} 
          />
        )}
        <span className="flex items-center gap-2">
          {isSubMenu && (
            <div className="relative w-4 h-4">
              <GoDot
                className={cn(
                  "absolute inset-0 w-4 h-4 text-gray-400 transition-opacity",
                  isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                )}
              />
              <GoDotFill
                className={cn(
                  "absolute inset-0 w-4 h-4 text-[#9c84f4] transition-opacity",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              />
            </div>
          )}
          {menu.labelSide}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 bg-white shadow-lg transition-all duration-500 ease-in-out",
        isCollapsed ? "w-16" : "w-64 lg:w-[210px]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <header className="flex items-center justify-between py-6 px-5">
        {!isCollapsed && (
          <span className="text-midnight-indigo text-lg font-semibold">Siam Outlet</span>
        )}
        <button onClick={onCollapse} className="p-1 hover:bg-gray-100 rounded-md">
          {isCollapsed ? (
            <RiMenuUnfoldLine className="w-5 h-5 text-[#999999]" />
          ) : (
            <RiMenuFoldLine className="w-5 h-5 text-[#999999]" />
          )}
        </button>
      </header>

      {!isCollapsed && <MenuButton />}

      <section 
        ref={sidebarRef}
        className="h-[calc(100vh-100px)] overflow-y-auto pb-14 text-sm hide-scrollbar lg:show-scrollbar"
      >
        <ul className="w-full">
          {isCollapsed ? (
            renderCollapsedMenuItem(DASHBOARD_MENU)
          ) : (
            <Accordion
              key={DASHBOARD_MENU.key}
              className={cn(
                "pl-5 pr-4 lg:pr-2 py-3 group",
                isSubmenuActive(DASHBOARD_MENU) 
                  ? "bg-[#7645D914] shadow-sm" 
                  : "hover:bg-[#7645D914] hover:shadow-sm"
              )}
              Icon={MdKeyboardArrowRight}
              iconClassName={cn(
                "text-gray-400",
                isSubmenuActive(DASHBOARD_MENU) ? "text-[#783cf1]" : "group-hover:text-[#783cf1]"
              )}
              iconActiveClassName="rotate-90"
              title={
                <div className="flex items-center gap-5 text-gray-700">
                  <DASHBOARD_MENU.icon className={cn(
                    "w-6 h-6",
                    isSubmenuActive(DASHBOARD_MENU) ? "text-[#783cf1]" : "text-gray-400 group-hover:text-[#783cf1]"
                  )} />
                  <span className={cn(
                    "transition-colors duration-300",
                    isSubmenuActive(DASHBOARD_MENU) 
                      ? "text-[#783cf1] font-medium"
                      : "group-hover:text-[#783cf1] group-hover:font-medium"
                  )}>
                    {DASHBOARD_MENU.label}
                  </span>
                </div>
              }
            >
              {DASHBOARD_MENU.sub_menu.map((sub) => renderMenuItem(sub, true))}
            </Accordion>
          )}
          
          {MAIN_MENU.map((menu) => renderMenuItem(menu))}
          
          {SUB_MENU.map((menu) => (
            isCollapsed ? (
              renderCollapsedMenuItem(menu)
            ) : (
              <Accordion
                key={menu.key}
                className={cn(
                  "pl-5 pr-4 lg:pr-2 py-3 group",
                  isSubmenuActive(menu) 
                    ? "bg-[#7645D914] shadow-sm" 
                    : "hover:bg-[#7645D914] hover:shadow-sm"
                )}
                Icon={MdKeyboardArrowRight}
                iconClassName={cn(
                  "text-gray-400",
                  isSubmenuActive(menu) ? "text-[#783cf1]" : "group-hover:text-[#783cf1]"
                )}
                iconActiveClassName="rotate-90"
                title={
                  <div className="flex items-center gap-5 text-gray-700">
                    <menu.icon className={cn(
                      "w-6 h-6",
                      isSubmenuActive(menu) ? "text-[#783cf1]" : "text-gray-400 group-hover:text-[#783cf1]"
                    )} />
                    <span className={cn(
                      "transition-colors duration-300",
                      isSubmenuActive(menu) 
                        ? "text-[#783cf1] font-medium"
                        : "group-hover:text-[#783cf1] group-hover:font-medium"
                    )}>
                      {menu.label}
                    </span>
                  </div>
                }
              >
                {menu.sub_menu.map((sub) => renderMenuItem(sub, true))}
              </Accordion>
            )
          ))}
        </ul>
      </section>
    </aside>
  );
}
