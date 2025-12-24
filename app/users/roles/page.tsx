"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Users, Shield } from "lucide-react";

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  createdAt: string;
}

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roles] = useState<Role[]>([
    {
      id: 1,
      name: "Admin",
      description: "Full access to all features",
      userCount: 1,
      permissions: ["All Permissions"],
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      name: "Editor",
      description: "Can upload, edit, and delete files",
      userCount: 2,
      permissions: ["Upload Files", "Edit Files", "Delete Files", "View Buckets"],
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      name: "Viewer",
      description: "Read-only access to files and buckets",
      userCount: 1,
      permissions: ["View Files", "View Buckets", "Download Files"],
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      name: "API Developer",
      description: "Can manage API keys and webhooks",
      userCount: 0,
      permissions: ["View API Keys", "Create API Keys", "Delete API Keys", "Manage Webhooks"],
      createdAt: "2024-02-01"
    }
  ]);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Role Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Define roles and assign permissions</p>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors ml-4">
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Roles</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{roles.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Active Users</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">
            {roles.reduce((sum, role) => sum + role.userCount, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Custom Roles</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">
            {roles.filter(r => r.name !== "Admin").length}
          </p>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                  <Shield className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Users size={16} />
                <span>{role.userCount} {role.userCount === 1 ? "User" : "Users"}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Permissions
              </p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Created: {role.createdAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
