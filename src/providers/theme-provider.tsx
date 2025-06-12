"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { detectBrowserLanguage } from "@/lib/translations";

interface ThemeSettings {
  language: string;
  theme: string;
  itemsPerPage: number;
  autoRefreshInterval: number;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  isInitialized: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultSettings: ThemeSettings = {
  language: "en",
  theme: "light",
  itemsPerPage: 25,
  autoRefreshInterval: 30,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Apply theme to document
  const applyTheme = (theme: string) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  // Initialize settings on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedSettings = localStorage.getItem("adminSettings");
    let initialSettings = defaultSettings;

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);

        // Handle auto language detection
        if (parsed.language === "auto") {
          parsed.language = detectBrowserLanguage();
        }

        initialSettings = { ...defaultSettings, ...parsed };
      } catch (error) {
        console.error("Error parsing saved settings:", error);
        initialSettings = {
          ...defaultSettings,
          language: detectBrowserLanguage(),
        };
      }
    } else {
      // First time - detect browser language
      initialSettings = {
        ...defaultSettings,
        language: detectBrowserLanguage(),
      };
    }

    setSettings(initialSettings);
    // Don't apply theme here since it's already applied by the script
    setIsInitialized(true);
  }, []);

  // Apply theme when it changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      applyTheme(settings.theme);
    }
  }, [settings.theme, isInitialized]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (settings.theme === "system" && isInitialized) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [settings.theme, isInitialized]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    if (typeof window === "undefined") return;

    const updatedSettings = { ...settings, ...newSettings };

    // Handle auto language detection
    if (newSettings.language === "auto") {
      updatedSettings.language = detectBrowserLanguage();
    }

    setSettings(updatedSettings);

    // Save to localStorage with original values (including "auto")
    const settingsToSave = { ...settings, ...newSettings };
    localStorage.setItem("adminSettings", JSON.stringify(settingsToSave));

    // Apply theme immediately if theme changed
    if (newSettings.theme) {
      applyTheme(newSettings.theme);
    }
  };

  // Show a minimal loading screen that matches the expected theme
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
