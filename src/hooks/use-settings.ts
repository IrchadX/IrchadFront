import { useState, useEffect } from "react";
import { translations } from "@/lib/translations";

export const useSettings = () => {
  const [settings, setSettings] = useState({
    language: "fr",
    theme: "light",
    itemsPerPage: 25,
    autoRefreshInterval: 30,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Get translations
  const t = translations[settings.language] || translations.fr;

  // Theme options
  const themeOptions = [
    { value: "light", label: t.light, icon: Sun },
    { value: "dark", label: t.dark, icon: Moon },
    { value: "system", label: t.system, icon: Monitor },
  ];

  // Refresh intervals
  const refreshIntervalOptions = [
    { value: 0, label: t.disabled },
    { value: 15, label: `15 ${t.seconds}` },
    { value: 30, label: `30 ${t.seconds}` },
    { value: 60, label: `1 ${t.minute}` },
    { value: 300, label: `5 ${t.minutes}` },
    { value: 600, label: `10 ${t.minutes}` },
  ];

  // Load settings
  useEffect(() => {
    const saved = localStorage.getItem("adminSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("adminSettings", JSON.stringify(newSettings));

    // Special handling for theme
    if (key === "theme") {
      applyTheme(value);
    }
  };

  const applyTheme = (theme: string) => {
    // ... your existing theme application logic
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would typically call an API to save settings
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSaveMessage(t.saveSuccess);
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage(t.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    settings,
    t,
    handleSettingChange,
    isSaving,
    saveMessage,
    handleSave,
    themeOptions,
    refreshIntervalOptions,
  };
};
