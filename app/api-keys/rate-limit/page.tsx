"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Shield,
  TrendingUp,
  TrendingDown,
  Zap,
  Ban,
  Save,
  Info
} from "lucide-react";

interface RateLimitConfig {
  id: number;
  name: string;
  type: string;
  limit: number;
  window: string;
  enabled: boolean;
  blocked: number;
  allowed: number;
}

export default function RateLimitPage() {
  const [saved, setSaved] = useState(false);
  const [rateLimits, setRateLimits] = useState<RateLimitConfig[]>([
    {
      id: 1,
      name: "Global Rate Limit",
      type: "global",
      limit: 1000,
      window: "1 minute",
      enabled: true,
      blocked: 45,
      allowed: 128934
    },
    {
      id: 2,
      name: "Per API Key Limit",
      type: "api-key",
      limit: 500,
      window: "1 minute",
      enabled: true,
      blocked: 12,
      allowed: 89456
    },
    {
      id: 3,
      name: "Upload Rate Limit",
      type: "upload",
      limit: 100,
      window: "1 hour",
      enabled: true,
      blocked: 8,
      allowed: 2456
    },
    {
      id: 4,
      name: "Download Rate Limit",
      type: "download",
      limit: 500,
      window: "1 hour",
      enabled: true,
      blocked: 3,
      allowed: 15678
    },
    {
      id: 5,
      name: "IP Address Limit",
      type: "ip",
      limit: 100,
      window: "1 minute",
      enabled: false,
      blocked: 0,
      allowed: 0
    }
  ]);

  const toggleLimit = (id: number) => {
    setRateLimits(rateLimits.map(limit => 
      limit.id === id ? { ...limit, enabled: !limit.enabled } : limit
    ));
  };

  const updateLimit = (id: number, newLimit: number) => {
    setRateLimits(rateLimits.map(limit => 
      limit.id === id ? { ...limit, limit: newLimit } : limit
    ));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalBlocked = rateLimits.reduce((sum, limit) => sum + limit.blocked, 0);
  const totalAllowed = rateLimits.reduce((sum, limit) => sum + limit.allowed, 0);
  const blockRate = ((totalBlocked / (totalBlocked + totalAllowed)) * 100).toFixed(2);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Rate Limiting</h1>
            <p className="text-gray-600 dark:text-gray-400">Configure API rate limits to protect your service</p>
          </div>

          {saved && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-400 font-medium">✓ Rate limit settings saved successfully!</p>
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Requests</p>
            <Activity className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAllowed + totalBlocked}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 24 hours</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Allowed</p>
            <CheckCircle className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-green-500">{totalAllowed}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} className="text-green-500" />
            <p className="text-xs text-green-500">Normal traffic</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Blocked</p>
            <Ban className="text-red-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-red-500">{totalBlocked}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{blockRate}% block rate</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Active Limits</p>
            <Shield className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {rateLimits.filter(l => l.enabled).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">of {rateLimits.length} configured</p>
        </div>
      </div>

      {/* Rate Limit Configs */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rate Limit Rules</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure and manage rate limiting policies</p>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {rateLimits.map((limit) => (
              <div
                key={limit.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      limit.enabled ? 'bg-green-100 dark:bg-green-950/30' : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Zap className={`${
                        limit.enabled ? 'text-green-500' : 'text-gray-500'
                      }`} size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{limit.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{limit.type} rate limiting</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLimit(limit.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      limit.enabled ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        limit.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                      Request Limit
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={limit.limit}
                        onChange={(e) => updateLimit(limit.id, parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={!limit.enabled}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">requests</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                      Time Window
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      disabled={!limit.enabled}
                      defaultValue={limit.window}
                    >
                      <option>1 minute</option>
                      <option>5 minutes</option>
                      <option>15 minutes</option>
                      <option>1 hour</option>
                      <option>1 day</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                      Current Status
                    </label>
                    <div className="flex items-center gap-2 h-10">
                      {limit.enabled ? (
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
                      ) : (
                        <span className="text-sm font-medium text-gray-500">Disabled</span>
                      )}
                    </div>
                  </div>
                </div>

                {limit.enabled && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Allowed</p>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">{limit.allowed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Blocked</p>
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">{limit.blocked}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Block Rate</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {((limit.blocked / (limit.blocked + limit.allowed)) * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Efficiency</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {((limit.allowed / (limit.blocked + limit.allowed)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-1">About Rate Limiting</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Rate limits protect your service from abuse and ensure fair usage</li>
              <li>• Requests exceeding the limit will receive a 429 (Too Many Requests) response</li>
              <li>• Different limits can be applied to different types of operations</li>
              <li>• Monitor blocked requests to adjust limits as needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
      >
        <Save size={18} />
        Save Changes
      </button>
          </div>
        </div>
      </div>
    </div>
  );
}
