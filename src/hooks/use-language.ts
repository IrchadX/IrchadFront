import { useState, useEffect } from "react";
import { getTranslations, type TranslationStrings } from "@/lib/translations";
import { useTheme } from "@/providers/theme-provider"; // Adjust path as needed

export const useLanguage = () => {
  const { settings, updateSettings } = useTheme();
  const [translations, setTranslations] = useState<TranslationStrings>(
    getTranslations(settings.language)
  );

  useEffect(() => {
    setTranslations(getTranslations(settings.language));
  }, [settings.language]);

  const updateLanguage = (newLanguage: string) => {
    updateSettings({ language: newLanguage });
  };

  return {
    language: settings.language,
    settings,
    translations,
    updateLanguage,
    updateSettings,
    isRTL: settings.language === "ar",
  };
};
