"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Globe, Monitor, Clock, RefreshCw } from "lucide-react";

interface SettingsData {
  language: string;
  theme: string;
  itemsPerPage: number;
  autoRefreshInterval: number;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<SettingsData>({
    language: "fr",
    theme: "light",
    itemsPerPage: 25,
    autoRefreshInterval: 30,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Language options
  const languageOptions = [
    { value: "auto", label: "Détection automatique", flag: "🌐" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "ar", label: "العربية", flag: "🇩🇿" },
  ];

  // Theme options
  const themeOptions = [
    { value: "light", label: "Clair", icon: Sun },
    { value: "dark", label: "Sombre", icon: Moon },
    { value: "system", label: "Système", icon: Monitor },
  ];

  // Items per page options
  const itemsPerPageOptions = [10, 25, 50, 100];

  // Auto-refresh interval options (in seconds)
  const refreshIntervalOptions = [
    { value: 0, label: "Désactivé" },
    { value: 15, label: "15 secondes" },
    { value: 30, label: "30 secondes" },
    { value: 60, label: "1 minute" },
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("adminSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key: keyof SettingsData, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem("adminSettings", JSON.stringify(settings));

      setSaveMessage("Paramètres sauvegardés avec succès !");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Erreur lors de la sauvegarde");
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
    <div className="bg-white rounded-lg border border-black-10 w-full">
      <h3 className="text-lg font-futura font-semibold text-black mb-4">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="w-full bg-red-500 p-6">
      {/* Header */}
      <div className="mb-8 w-full">
        <h1 className="text-3xl font-futura font-bold text-black mb-2">
          Paramètres
        </h1>
        <p className="text-black-30 font-montserrat">
          Configurez vos préférences d'administration
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes("succès")
              ? "bg-main-5 text-main border border-main-20"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
          {saveMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Language Settings */}
        <SettingCard title="Langue de l'interface">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languageOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  settings.language === option.value
                    ? "border-main bg-main-5"
                    : "border-black-10 hover:border-main-20"
                }`}>
                <input
                  type="radio"
                  name="language"
                  value={option.value}
                  checked={settings.language === option.value}
                  onChange={(e) =>
                    handleSettingChange("language", e.target.value)
                  }
                  className="sr-only"
                />
                <span className="text-xl mr-3">{option.flag}</span>
                <span className="font-montserrat">{option.label}</span>
              </label>
            ))}
          </div>
        </SettingCard>

        {/* Theme Settings */}
        <SettingCard title="Thème">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    settings.theme === option.value
                      ? "border-main bg-main-5"
                      : "border-black-10 hover:border-main-20"
                  }`}>
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={settings.theme === option.value}
                    onChange={(e) =>
                      handleSettingChange("theme", e.target.value)
                    }
                    className="sr-only"
                  />
                  <IconComponent className="w-5 h-5 mr-3 text-main" />
                  <span className="font-montserrat">{option.label}</span>
                </label>
              );
            })}
          </div>
        </SettingCard>

        {/* Display Settings */}
        <SettingCard title="Affichage">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-black mb-2">
                Éléments par page
              </label>
              <select
                value={settings.itemsPerPage}
                onChange={(e) =>
                  handleSettingChange("itemsPerPage", parseInt(e.target.value))
                }
                className="w-full p-3 border border-black-10 rounded-lg focus:ring-2 focus:ring-main focus:border-main font-montserrat">
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} éléments
                  </option>
                ))}
              </select>
            </div>
          </div>
        </SettingCard>

        {/* Data Management */}
        <SettingCard title="Gestion des données">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-montserrat font-medium text-black mb-2">
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Actualisation automatique
              </label>
              <select
                value={settings.autoRefreshInterval}
                onChange={(e) =>
                  handleSettingChange(
                    "autoRefreshInterval",
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-3 border border-black-10 rounded-lg focus:ring-2 focus:ring-main focus:border-main font-montserrat">
                {refreshIntervalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-black-30 mt-2 font-montserrat">
                Fréquence d'actualisation automatique des données
                d'environnement
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
                ? "bg-black-10 text-black-30 cursor-not-allowed"
                : "bg-main text-white hover:bg-main-40 active:transform active:scale-95"
            }`}>
            {isSaving ? (
              <>
                <Clock className="w-4 h-4 inline mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              "Sauvegarder les paramètres"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
