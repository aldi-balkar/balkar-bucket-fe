"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Search, 
  Plus, 
  Key, 
  Copy, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

interface ApiKey {
  id: number;
  name: string;
  key: string;
  app: string;
  status: "Active" | "Revoked" | "Expired";
  permissions: string[];
  rateLimit: string;
  usage: {
    requests: number;
    uploads: number;
    storage: string;
    errors: number;
  };
  createdAt: string;
  lastUsed: string;
  expiresAt: string;
}

export default function ApiKeysPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showKey, setShowKey] = useState<{ [key: number]: boolean }>({});
  const [apiKeys] = useState<ApiKey[]>([
    {
      id: 1,
      name: "Web App Production",
      key: "balkar_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1",
      app: "Web App",
      status: "Active",
      permissions: ["upload", "read", "delete", "list"],
      rateLimit: "1000 req/min",
      usage: {
        requests: 45230,
        uploads: 2456,
        storage: "45.2 GB",
        errors: 3
      },
      createdAt: "2024-01-15",
      lastUsed: "2 min ago",
      expiresAt: "2025-01-15"
    },
    {
      id: 2,
      name: "Mobile App",
      key: "balkar_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2",
      app: "Mobile App",
      status: "Active",
      permissions: ["upload", "read"],
      rateLimit: "500 req/min",
      usage: {
        requests: 28940,
        uploads: 1847,
        storage: "28.5 GB",
        errors: 12
      },
      createdAt: "2024-02-01",
      lastUsed: "15 min ago",
      expiresAt: "2025-02-01"
    },
    {
      id: 3,
      name: "Public Website",
      key: "balkar_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3",
      app: "Public Site",
      status: "Active",
      permissions: ["read"],
      rateLimit: "100 req/min",
      usage: {
        requests: 12450,
        uploads: 0,
        storage: "0 GB",
        errors: 1
      },
      createdAt: "2024-03-10",
      lastUsed: "1 hour ago",
      expiresAt: "Never"
    },
    {
      id: 4,
      name: "Legacy API",
      key: "balkar_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4",
      app: "Old System",
      status: "Revoked",
      permissions: ["upload", "read", "delete", "list"],
      rateLimit: "Unlimited",
      usage: {
        requests: 156890,
        uploads: 8920,
        storage: "89.4 GB",
        errors: 45
      },
      createdAt: "2023-06-20",
      lastUsed: "30 days ago",
      expiresAt: "2024-06-20"
    },
    {
      id: 5,
      name: "Test Environment",
      key: "sk_test_dev789xyz123abc456def789ghi012jkl345",
      app: "Development",
      status: "Active",
      permissions: ["upload", "read", "delete", "list"],
      rateLimit: "Unlimited",
      usage: {
        requests: 892,
        uploads: 234,
        storage: "12.1 GB",
        errors: 8
      },
      createdAt: "2024-12-01",
      lastUsed: "5 min ago",
      expiresAt: "2025-06-01"
    }
  ]);

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.app.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleShowKey = (id: number) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + "..." + key.substring(key.length - 8);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">API Keys</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage API keys for application access</p>
          </div>

          {/* Actions Bar */}
          <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search API keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors ml-4">
          <Plus size={18} />
          Generate API Key
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Keys</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{apiKeys.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-950/30 rounded-lg">
              <Key className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Keys</p>
              <p className="text-2xl font-bold text-green-500 mt-1">
                {apiKeys.filter(k => k.status === "Active").length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-950/30 rounded-lg">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {apiKeys.reduce((sum, k) => sum + k.usage.requests, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-950/30 rounded-lg">
              <Activity className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Errors</p>
              <p className="text-2xl font-bold text-red-500 mt-1">
                {apiKeys.reduce((sum, k) => sum + k.usage.errors, 0)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-950/30 rounded-lg">
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {filteredKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  apiKey.status === "Active" ? "bg-green-100 dark:bg-green-950/30" :
                  apiKey.status === "Revoked" ? "bg-red-100 dark:bg-red-950/30" :
                  "bg-gray-100 dark:bg-gray-800"
                }`}>
                  <Key className={`${
                    apiKey.status === "Active" ? "text-green-500" :
                    apiKey.status === "Revoked" ? "text-red-500" :
                    "text-gray-500"
                  }`} size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{apiKey.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apiKey.status === "Active" ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400" :
                      apiKey.status === "Revoked" ? "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400" :
                      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                    }`}>
                      {apiKey.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{apiKey.app}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* API Key Display */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                API Key
              </label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-900 dark:text-white">
                  {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <button
                  onClick={() => toggleShowKey(apiKey.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {showKey[apiKey.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                Permissions
              </label>
              <div className="flex flex-wrap gap-2">
                {apiKey.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Requests</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{apiKey.usage.requests}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Uploads</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{apiKey.usage.uploads}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Storage Used</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{apiKey.usage.storage}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Errors</p>
                <p className={`text-sm font-semibold ${apiKey.usage.errors > 10 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                  {apiKey.usage.errors}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rate Limit</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{apiKey.rateLimit}</p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Last used: {apiKey.lastUsed}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield size={14} />
                  <span>Created: {apiKey.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {apiKey.expiresAt === "Never" ? (
                  <span className="text-green-600 dark:text-green-400 font-medium">Never expires</span>
                ) : (
                  <>
                    <AlertTriangle className="text-yellow-500" size={14} />
                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">Expires: {apiKey.expiresAt}</span>
                  </>
                )}
              </div>
            </div>

            {/* Warning Banner for High Errors */}
            {apiKey.usage.errors > 10 && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">High Error Rate Detected</p>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                    This API key has {apiKey.usage.errors} errors. Review logs or consider rotating the key.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        </div>
        </div>
      </div>
    </div>
  );
}
