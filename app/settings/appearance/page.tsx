"use client";

import { useState, useEffect } from "react";
import { Palette, Type, Image as ImageIcon, Save } from "lucide-react";

export default function AppearancePage() {
  const [appName, setAppName] = useState("Balkar Bucket");
  const [primaryColor, setPrimaryColor] = useState("#f97316");
  const [logo, setLogo] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const savedAppName = localStorage.getItem("appName");
    const savedColor = localStorage.getItem("primaryColor");
    const savedLogo = localStorage.getItem("appLogo");
    
    if (savedAppName) setAppName(savedAppName);
    if (savedColor) setPrimaryColor(savedColor);
    if (savedLogo) setLogo(savedLogo);
  }, []);

  const handleSave = () => {
    localStorage.setItem("appName", appName);
    localStorage.setItem("primaryColor", primaryColor);
    localStorage.setItem("appLogo", logo);
    
    // Update CSS variable for primary color
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Reload to apply changes
    window.location.reload();
  };

  const predefinedColors = [
    { name: "Orange", value: "#f97316" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appearance Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Customize the look and feel of your application</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-400 font-medium">✓ Settings saved successfully!</p>
        </div>
      )}

      {/* App Name */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Type className="text-orange-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Application Name</h2>
        </div>
        <input
          type="text"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter application name"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This name will appear in the sidebar and browser title
        </p>
      </div>

      {/* Logo */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <ImageIcon className="text-orange-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Application Logo</h2>
        </div>
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter logo URL or upload image"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Paste an image URL or upload your custom logo (recommended size: 32x32px)
        </p>
        {logo && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
            <img src={logo} alt="Logo preview" className="w-8 h-8 rounded" onError={(e) => {
              e.currentTarget.style.display = 'none';
            }} />
          </div>
        )}
      </div>

      {/* Primary Color */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="text-orange-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Primary Color</h2>
        </div>
        
        {/* Color Presets */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
          {predefinedColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setPrimaryColor(color.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                primaryColor === color.value
                  ? "border-gray-900 dark:border-white"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: color.value }}
              ></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{color.name}</span>
            </button>
          ))}
        </div>

        {/* Custom Color Picker */}
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-20 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="#f97316"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This color will be used for buttons, links, and accent elements
        </p>
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
