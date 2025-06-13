"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Globe, Monitor, Clock, RefreshCw } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface SettingsData {
  language: string;
  theme: string;
  itemsPerPage: number;
  autoRefreshInterval: number;
}

const SettingsPage = () => {
  const { language, settings, translations: t, updateSettings } = useLanguage();
  const [localSettings, setLocalSettings] = useState<SettingsData>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isAutoLanguage, setIsAutoLanguage] = useState(false);

  // Language options
  const languageOptions = [
    { value: "auto", label: t.settings.autoDetect, flag: "🌐" },
    { value: "fr", label: t.settings.french, flag: "🇫🇷" },
    { value: "en", label: t.settings.english, flag: "🇺🇸" },
    { value: "ar", label: t.settings.arabic, flag: "🇩🇿" },
  ];

  // Theme options
  const themeOptions = [
    { value: "light", label: t.settings.light, icon: Sun },
    { value: "dark", label: t.settings.dark, icon: Moon },
    { value: "system", label: t.settings.system, icon: Monitor },
  ];

  // Items per page options
  const itemsPerPageOptions = [10, 25, 50, 100];

  // Auto-refresh interval options (in seconds)
  const getRefreshIntervalOptions = () => [
    { value: 0, label: t.settings.disabled },
    { value: 15, label: `15 ${t.settings.seconds}` },
    { value: 30, label: `30 ${t.settings.seconds}` },
    { value: 60, label: `1 ${t.settings.minute}` },
    { value: 300, label: `5 ${t.settings.minutes}` },
    { value: 600, label: `10 ${t.settings.minutes}` },
  ];

  // Check if auto language is set in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("adminSettings");
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setIsAutoLanguage(parsed.language === "auto");
        } catch (error) {
          console.error("Error parsing saved settings:", error);
        }
      }
    }
  }, []);

  // Sync local settings with global settings
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Detect browser language
  const detectBrowserLanguage = () => {
    if (typeof window === "undefined") return "en";
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "fr") return "fr";
    if (browserLang === "ar") return "ar";
    return "en"; // Default to English
  };

  const handleSettingChange = (key: keyof SettingsData, value: any) => {
    const newSettings = { ...localSettings, [key]: value };

    // Handle auto language detection
    if (key === "language") {
      if (value === "auto") {
        setIsAutoLanguage(true);
        const detectedLang = detectBrowserLanguage();
        newSettings.language = detectedLang;
      } else {
        setIsAutoLanguage(false);
      }
    }

    setLocalSettings(newSettings);

    // Update global settings with the actual value (auto or specific language)
    const settingsToUpdate = { ...newSettings };
    if (key === "language" && value === "auto") {
      // Save "auto" to localStorage but use detected language for UI
      updateSettings({ ...settingsToUpdate, language: value });
    } else {
      updateSettings(settingsToUpdate);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Settings are already saved via updateSettings
      setSaveMessage(t.settings.saveSuccess);
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage(t.settings.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  const SettingCard = ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div className="bg-white dark:bg-black/20 rounded-lg border border-black-10 dark:border-white/10 p-6 w-full">
      <h3 className="text-lg font-futura font-semibold text-black dark:text-white mb-4">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div
      className={`w-full p-6 min-h-screen bg-white dark:bg-black transition-colors duration-300 max-w-5xl mx-auto ${
        language === "ar" ? "rtl" : "ltr"
      }`}>
      {/* Header */}
      <div className="mb-8 w-full">
        <p className="text-black-30 dark:text-white/70 font-montserrat">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes(t.settings.saveSuccess.split(" ")[0]) ||
            saveMessage.includes("successfully")
              ? "bg-main-5 dark:bg-main-20 text-main dark:text-main border border-main-20 dark:border-main"
              : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
          }`}>
          {saveMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Language Settings */}
        <SettingCard title={t.settings.languageSection}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languageOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  (option.value === "auto" && isAutoLanguage) ||
                  (option.value !== "auto" &&
                    localSettings.language === option.value &&
                    !isAutoLanguage)
                    ? "border-main bg-main-5 dark:bg-main-20 dark:border-main"
                    : "border-black-10 dark:border-white/20 hover:border-main-20 dark:hover:border-main-40"
                }`}>
                <input
                  type="radio"
                  name="language"
                  value={option.value}
                  checked={
                    (option.value === "auto" && isAutoLanguage) ||
                    (option.value !== "auto" &&
                      localSettings.language === option.value &&
                      !isAutoLanguage)
                  }
                  onChange={(e) =>
                    handleSettingChange("language", e.target.value)
                  }
                  className="sr-only"
                />
                <span className="text-xl mr-3">{option.flag}</span>
                <span className="font-montserrat text-black dark:text-white">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </SettingCard>

        {/* Theme Settings */}
        <SettingCard title={t.settings.themeSection}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    localSettings.theme === option.value
                      ? "border-main bg-main-5 dark:bg-main-20 dark:border-main"
                      : "border-black-10 dark:border-white/20 hover:border-main-20 dark:hover:border-main-40"
                  }`}>
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={localSettings.theme === option.value}
                    onChange={(e) =>
                      handleSettingChange("theme", e.target.value)
                    }
                    className="sr-only"
                  />
                  <IconComponent className="w-5 h-5 mr-3 text-main" />
                  <span className="font-montserrat text-black dark:text-white">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </SettingCard>

        {/* Display Settings */}
        <SettingCard title={t.settings.displaySection}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-black dark:text-white mb-2">
                {t.settings.itemsPerPage}
              </label>
              <select
                value={localSettings.itemsPerPage}
                onChange={(e) =>
                  handleSettingChange("itemsPerPage", parseInt(e.target.value))
                }
                className="w-full p-3 border border-black-10 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-main focus:border-main font-montserrat bg-white dark:bg-black/50 text-black dark:text-white">
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} {t.settings.elements}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </SettingCard>

        {/* Data Management */}
        <SettingCard title={t.settings.dataSection}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-black dark:text-white mb-2">
                <RefreshCw className="w-4 h-4 inline mr-2" />
                {t.settings.autoRefresh}
              </label>
              <select
                value={localSettings.autoRefreshInterval}
                onChange={(e) =>
                  handleSettingChange(
                    "autoRefreshInterval",
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-3 border border-black-10 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-main focus:border-main font-montserrat bg-white dark:bg-black/50 text-black dark:text-white">
                {getRefreshIntervalOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-black-30 dark:text-white/70 mt-2 font-montserrat">
                {t.settings.autoRefreshDesc}
              </p>
            </div>
          </div>
        </SettingCard>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-3 rounded-lg font-montserrat font-medium transition-all ${
              isSaving
                ? "bg-black-10 dark:bg-white/10 text-black-30 dark:text-white/50 cursor-not-allowed"
                : "bg-main text-white hover:bg-main-40 active:transform active:scale-95"
            }`}>
            {isSaving ? (
              <>
                <Clock className="w-4 h-4 inline mr-2 animate-spin" />
                {t.settings.saving}
              </>
            ) : (
              t.settings.saveButton
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
