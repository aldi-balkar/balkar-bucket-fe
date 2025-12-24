"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { 
  TrendingUp, 
  TrendingDown, 
  Info, 
  FolderOpen, 
  FileText, 
  HardDrive, 
  Database,
  Key,
  AlertCircle,
  Upload,
  Download,
  Activity,
  Shield,
  Clock,
  Users,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Search, 
  Bell, 
  Moon, 
  Sun 
} from "lucide-react";

const stats = [
  {
    label: "Storage Used",
    value: "120 GB",
    total: "/ 500 GB",
    percentage: 24,
    change: "+12 GB this month",
    changePercent: "+11%",
    isPositive: true,
    warning: false,
  },
  {
    label: "Total Files",
    value: "8,547",
    subValue: "124 in trash",
    change: "+234 this week",
    changePercent: "+2.8%",
    isPositive: true,
  },
  {
    label: "Total Buckets",
    value: "12",
    subValue: "8 private • 4 public",
    change: "+2 this month",
    changePercent: "+20%",
    isPositive: true,
  },
  {
    label: "Active API Keys",
    value: "5",
    subValue: "2 apps connected",
    change: "3 revoked",
    changePercent: "Secure",
    isPositive: true,
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      const isDark = JSON.parse(saved);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    console.log("Toggle Dark Mode:", newMode);
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      console.log("Added dark class");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Removed dark class");
    }
    console.log("Current classes:", document.documentElement.className);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-300 dark:border-gray-600">
                ⌘ K
              </kbd>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 ml-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="text-gray-600 dark:text-gray-400" size={20} />
              ) : (
                <Moon className="text-gray-600 dark:text-gray-400" size={20} />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
              <Bell className="text-gray-600 dark:text-gray-400" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 border-2 border-white dark:border-gray-900"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Overview of your storage buckets</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    {stat.label}
                    <Info size={14} className="text-gray-400" />
                  </span>
                </div>
                <div className="mb-2">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                    {stat.total && <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">{stat.total}</span>}
                  </h3>
                  {stat.subValue && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.subValue}</p>
                  )}
                </div>
                {stat.percentage !== undefined && (
                  <div className="mb-2">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${stat.percentage > 80 ? 'bg-red-500' : 'bg-orange-500'} rounded-full`}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{stat.change}</span>
                  <span
                    className={`flex items-center gap-1 font-medium ${
                      stat.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {typeof stat.changePercent === 'string' && !stat.changePercent.includes('%') ? (
                      <CheckCircle size={14} />
                    ) : stat.isPositive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {stat.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Trend Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Trend</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days activity</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg">Files</button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">Size (MB)</button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-end justify-between h-48 gap-2">
                {[
                  { day: "Mon", value: 65, files: 234 },
                  { day: "Tue", value: 78, files: 298 },
                  { day: "Wed", value: 52, files: 189 },
                  { day: "Thu", value: 88, files: 356 },
                  { day: "Fri", value: 92, files: 402 },
                  { day: "Sat", value: 45, files: 167 },
                  { day: "Sun", value: 38, files: 142 },
                ].map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group">
                      <div 
                        className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-all cursor-pointer"
                        style={{ height: `${item.value * 1.8}px` }}
                      >
                      </div>
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.files} files
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Uploads */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="text-green-500" size={20} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Uploads</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Latest file uploads</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { name: "profile-avatar.png", bucket: "user-uploads", size: "245 KB", app: "Web App", time: "2 min ago", status: "success" },
                    { name: "document.pdf", bucket: "public-assets", size: "1.2 MB", app: "Mobile App", time: "15 min ago", status: "success" },
                    { name: "banner-image.jpg", bucket: "media-library", size: "3.5 MB", app: "Admin Panel", time: "1 hour ago", status: "success" },
                    { name: "backup-data.zip", bucket: "backups", size: "45 MB", app: "Cron Job", time: "2 hours ago", status: "success" },
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center">
                          <FileText className="text-green-500" size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {file.bucket} • {file.size} • {file.app}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{file.time}</p>
                        <CheckCircle className="text-green-500 ml-auto mt-1" size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Errors */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={20} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Errors</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Failed operations</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { type: "Quota Exceeded", app: "Mobile App", detail: "Storage limit reached", time: "5 min ago", severity: "high" },
                    { type: "Auth Failed", app: "Third Party", detail: "Invalid API key", time: "20 min ago", severity: "medium" },
                    { type: "File Type Rejected", app: "Web App", detail: ".exe not allowed", time: "1 hour ago", severity: "low" },
                    { type: "Upload Failed", app: "Admin Panel", detail: "Network timeout", time: "3 hours ago", severity: "medium" },
                  ].map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          error.severity === 'high' ? 'bg-red-100 dark:bg-red-950/30' : 
                          error.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-950/30' : 
                          'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <XCircle className={`${
                            error.severity === 'high' ? 'text-red-500' : 
                            error.severity === 'medium' ? 'text-yellow-500' : 
                            'text-gray-500'
                          }`} size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{error.type}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {error.app} • {error.detail}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{error.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bucket & App Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Buckets by Size */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Database className="text-blue-500" size={20} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Buckets by Size</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Largest storage consumers</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { name: "backups", size: "45.2 GB", files: 234, percentage: 90, status: "private" },
                    { name: "media-library", size: "28.5 GB", files: 1847, percentage: 57, status: "public" },
                    { name: "user-uploads", size: "18.3 GB", files: 3456, percentage: 37, status: "private" },
                    { name: "public-assets", size: "12.1 GB", files: 892, percentage: 24, status: "public" },
                  ].map((bucket, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="text-orange-500" size={18} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{bucket.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            bucket.status === 'private' 
                              ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400' 
                              : 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                          }`}>
                            {bucket.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{bucket.size}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{bucket.files} files</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${bucket.percentage > 80 ? 'bg-red-500' : 'bg-orange-500'}`}
                          style={{ width: `${bucket.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Apps Usage */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Activity className="text-purple-500" size={20} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Apps Usage</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Most active applications</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[
                    { name: "Web App", uploads: 2456, storage: "45.2 GB", errors: 3, status: "healthy" },
                    { name: "Mobile App", uploads: 1847, storage: "28.5 GB", errors: 12, status: "warning" },
                    { name: "Admin Panel", uploads: 892, storage: "18.3 GB", errors: 1, status: "healthy" },
                    { name: "Cron Job", uploads: 234, storage: "12.1 GB", errors: 0, status: "healthy" },
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          app.status === 'healthy' ? 'bg-green-100 dark:bg-green-950/30' : 'bg-yellow-100 dark:bg-yellow-950/30'
                        }`}>
                          <Key className={`${app.status === 'healthy' ? 'text-green-500' : 'text-yellow-500'}`} size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{app.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {app.uploads} uploads • {app.storage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs">
                          {app.errors > 0 ? (
                            <>
                              <AlertCircle className="text-red-500" size={14} />
                              <span className="text-red-500 font-medium">{app.errors} errors</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="text-green-500" size={14} />
                              <span className="text-green-500 font-medium">Healthy</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Security Status */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Shield className="text-green-500" size={20} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Status</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">System security overview</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Public Buckets", value: "4", status: "info", icon: FolderOpen },
                    { label: "Expired URLs", value: "0", status: "success", icon: Clock },
                    { label: "Unlimited Keys", value: "2", status: "warning", icon: Key },
                    { label: "Clean Files", value: "100%", status: "success", icon: CheckCircle },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <item.icon 
                        className={`mx-auto mb-2 ${
                          item.status === 'success' ? 'text-green-500' : 
                          item.status === 'warning' ? 'text-yellow-500' : 
                          'text-blue-500'
                        }`} 
                        size={24} 
                      />
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">Fast access tools</p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors">
                    <Plus size={18} />
                    <span className="text-sm font-medium">Create Bucket</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors">
                    <Key size={18} />
                    <span className="text-sm font-medium">Generate API Key</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors">
                    <Upload size={18} />
                    <span className="text-sm font-medium">Upload File</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors">
                    <Trash2 size={18} />
                    <span className="text-sm font-medium">Cleanup Trash</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
