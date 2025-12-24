"use client";

import { useState, useEffect } from "react";
import { Bell, Save, AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

interface AlertConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: any;
  color: string;
}

export default function AlertsPage() {
  const [saved, setSaved] = useState(false);
  const [alerts, setAlerts] = useState<AlertConfig[]>([
    {
      id: "upload-success",
      name: "Upload Success",
      description: "Show notification when files are uploaded successfully",
      enabled: true,
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: "upload-error",
      name: "Upload Error",
      description: "Show notification when file upload fails",
      enabled: true,
      icon: XCircle,
      color: "text-red-500"
    },
    {
      id: "storage-warning",
      name: "Storage Warning",
      description: "Alert when storage quota reaches 80%",
      enabled: true,
      icon: AlertCircle,
      color: "text-yellow-500"
    },
    {
      id: "storage-full",
      name: "Storage Full",
      description: "Alert when storage quota is full",
      enabled: true,
      icon: AlertCircle,
      color: "text-red-500"
    },
    {
      id: "api-key-expiry",
      name: "API Key Expiring",
      description: "Notify 7 days before API key expires",
      enabled: true,
      icon: Info,
      color: "text-blue-500"
    },
    {
      id: "new-bucket",
      name: "New Bucket Created",
      description: "Confirmation when new bucket is created",
      enabled: true,
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: "file-deleted",
      name: "File Deleted",
      description: "Confirmation when files are deleted",
      enabled: false,
      icon: Info,
      color: "text-blue-500"
    },
    {
      id: "webhook-triggered",
      name: "Webhook Triggered",
      description: "Show when webhook events are fired",
      enabled: false,
      icon: Bell,
      color: "text-purple-500"
    },
  ]);

  useEffect(() => {
    const savedAlerts = localStorage.getItem("alertSettings");
    if (savedAlerts) {
      const parsed = JSON.parse(savedAlerts);
      setAlerts(alerts.map(alert => ({
        ...alert,
        enabled: parsed[alert.id] !== undefined ? parsed[alert.id] : alert.enabled
      })));
    }
  }, []);

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const handleSave = () => {
    const alertSettings = alerts.reduce((acc, alert) => ({
      ...acc,
      [alert.id]: alert.enabled
    }), {});
    
    localStorage.setItem("alertSettings", JSON.stringify(alertSettings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const enableAll = () => {
    setAlerts(alerts.map(alert => ({ ...alert, enabled: true })));
  };

  const disableAll = () => {
    setAlerts(alerts.map(alert => ({ ...alert, enabled: false })));
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Alert Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure which notifications to show in the application</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-400 font-medium">✓ Alert settings saved successfully!</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex gap-3">
          <button
            onClick={enableAll}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Enable All
          </button>
          <button
            onClick={disableAll}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Disable All
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Types</h2>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-start gap-4 flex-1">
                  <Icon className={alert.color} size={20} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {alert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alert.enabled ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alert.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
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
  );
}
