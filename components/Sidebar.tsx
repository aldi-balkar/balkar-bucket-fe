"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderOpen,
  FileText,
  Key,
  ScrollText,
  Settings,
  Package,
  ChevronDown,
  ChevronRight,
  Users
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/",
    submenu: [
      { label: "Overview", href: "/" },
    ]
  },
  { 
    icon: FolderOpen, 
    label: "Buckets", 
    href: "/buckets",
    submenu: [
      { label: "List Buckets", href: "/buckets" },
      { label: "Create Bucket", href: "/buckets/create" },
      { label: "Bucket Settings", href: "/buckets/settings" },
    ]
  },
  { 
    icon: FileText, 
    label: "Files", 
    href: "/files",
    submenu: [
      { label: "Browse Files", href: "/files" },
      { label: "Upload", href: "/files/upload" },
      { label: "Deleted Files (Trash)", href: "/files/trash" },
    ]
  },
  { 
    icon: Key, 
    label: "API Keys", 
    href: "/api-keys",
    submenu: [
      { label: "Create API Key", href: "/api-keys/create" },
      { label: "Permissions", href: "/api-keys/permissions" },
      { label: "Rate Limit", href: "/api-keys/rate-limit" },
    ]
  },
  { 
    icon: ScrollText, 
    label: "Logs", 
    href: "/logs",
    submenu: [
      { label: "Upload Logs", href: "/logs/upload" },
      { label: "Access Logs", href: "/logs/access" },
    ]
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/settings",
    submenu: [
      { label: "Security", href: "/settings/security" },
      { label: "Quota", href: "/settings/quota" },
      { label: "Webhook", href: "/settings/webhook" },
      { label: "Appearance", href: "/settings/appearance" },
      { label: "Alerts", href: "/settings/alerts" },
    ]
  },
  { 
    icon: Users, 
    label: "User Management", 
    href: "/users",
    submenu: [
      { label: "Users", href: "/users" },
      { label: "Roles", href: "/users/roles" },
      { label: "Permissions", href: "/users/permissions" },
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [appName, setAppName] = useState("Balkar Bucket");
  const [appLogo, setAppLogo] = useState("");

  useEffect(() => {
    const savedAppName = localStorage.getItem("appName");
    const savedAppLogo = localStorage.getItem("appLogo");
    if (savedAppName) setAppName(savedAppName);
    if (savedAppLogo) setAppLogo(savedAppLogo);
  }, []);

  // Auto-expand menu when on a submenu page
  useEffect(() => {
    const activeMenu = menuItems.find(item => 
      item.submenu?.some(sub => pathname === sub.href)
    );
    if (activeMenu && !expandedMenus.includes(activeMenu.label)) {
      setExpandedMenus([activeMenu.label]);
    }
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [label] // Hanya buka satu menu, tutup yang lain
    );
  };

  const isMenuExpanded = (label: string) => expandedMenus.includes(label);
  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: any) => {
    return item.submenu?.some((sub: any) => pathname === sub.href);
  };

  return (
    <aside className="w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          {appLogo ? (
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <img src={appLogo} alt="App Logo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
          )}
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">{appName}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Storage System</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const expanded = isMenuExpanded(item.label);
            const parentActive = isParentActive(item);

            return (
              <div key={item.label}>
                {/* Parent Menu */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    parentActive
                      ? "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {expanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {/* Submenu */}
                <div 
                  className={`ml-9 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(sub.href)
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
