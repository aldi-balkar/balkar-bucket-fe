"use client";

import { useState } from "react";
import { Search, Shield, Lock, Eye, Upload, Trash2, Settings, Key } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  roles: string[];
}

export default function PermissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const permissions: Permission[] = [
    // Bucket Permissions
    {
      id: "bucket.view",
      name: "View Buckets",
      description: "Can view bucket list and details",
      category: "Buckets",
      icon: Eye,
      roles: ["Admin", "Editor", "Viewer"]
    },
    {
      id: "bucket.create",
      name: "Create Buckets",
      description: "Can create new buckets",
      category: "Buckets",
      icon: Shield,
      roles: ["Admin", "Editor"]
    },
    {
      id: "bucket.delete",
      name: "Delete Buckets",
      description: "Can delete existing buckets",
      category: "Buckets",
      icon: Trash2,
      roles: ["Admin"]
    },
    {
      id: "bucket.settings",
      name: "Configure Buckets",
      description: "Can modify bucket settings",
      category: "Buckets",
      icon: Settings,
      roles: ["Admin"]
    },
    // File Permissions
    {
      id: "file.view",
      name: "View Files",
      description: "Can view file list and details",
      category: "Files",
      icon: Eye,
      roles: ["Admin", "Editor", "Viewer"]
    },
    {
      id: "file.upload",
      name: "Upload Files",
      description: "Can upload new files",
      category: "Files",
      icon: Upload,
      roles: ["Admin", "Editor"]
    },
    {
      id: "file.delete",
      name: "Delete Files",
      description: "Can delete files",
      category: "Files",
      icon: Trash2,
      roles: ["Admin", "Editor"]
    },
    // API Key Permissions
    {
      id: "api.view",
      name: "View API Keys",
      description: "Can view API key list",
      category: "API Keys",
      icon: Eye,
      roles: ["Admin", "API Developer"]
    },
    {
      id: "api.create",
      name: "Create API Keys",
      description: "Can create new API keys",
      category: "API Keys",
      icon: Key,
      roles: ["Admin", "API Developer"]
    },
    {
      id: "api.delete",
      name: "Delete API Keys",
      description: "Can revoke API keys",
      category: "API Keys",
      icon: Trash2,
      roles: ["Admin", "API Developer"]
    },
    // Settings Permissions
    {
      id: "settings.view",
      name: "View Settings",
      description: "Can view application settings",
      category: "Settings",
      icon: Eye,
      roles: ["Admin"]
    },
    {
      id: "settings.edit",
      name: "Edit Settings",
      description: "Can modify application settings",
      category: "Settings",
      icon: Settings,
      roles: ["Admin"]
    },
    // User Management Permissions
    {
      id: "users.view",
      name: "View Users",
      description: "Can view user list",
      category: "Users",
      icon: Eye,
      roles: ["Admin"]
    },
    {
      id: "users.manage",
      name: "Manage Users",
      description: "Can create, edit, and delete users",
      category: "Users",
      icon: Shield,
      roles: ["Admin"]
    },
    {
      id: "roles.manage",
      name: "Manage Roles",
      description: "Can create and modify roles",
      category: "Users",
      icon: Lock,
      roles: ["Admin"]
    }
  ];

  const categories = ["All", ...Array.from(new Set(permissions.map(p => p.category)))];

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || permission.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Permission Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage permissions and role assignments</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Permissions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{permissions.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Categories</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">{categories.length - 1}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Admin Only</p>
          <p className="text-2xl font-bold text-red-500 mt-1">
            {permissions.filter(p => p.roles.length === 1 && p.roles.includes("Admin")).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Public Access</p>
          <p className="text-2xl font-bold text-green-500 mt-1">
            {permissions.filter(p => p.roles.includes("Viewer")).length}
          </p>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Permission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Assigned Roles
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPermissions.map((permission) => {
              const Icon = permission.icon;
              return (
                <tr key={permission.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                        <Icon className="text-orange-500" size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {permission.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-400">
                      {permission.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {permission.roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
