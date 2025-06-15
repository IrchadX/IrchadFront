"use client";
import { usePathname } from "next/navigation";
import { Moon, Sun, Monitor, Globe } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");
  const {
    settings,
    updateSettings,
    updateLanguage,
    translations: t,
    isRTL,
  } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTitle = () => {
    if (pathname.startsWith("/decideur/dashboard")) {
      return t.navigation.dashboard;
    } else if (pathname.startsWith("/decideur/users")) {
      return t.pageTitle.userManagement;
    } else if (pathname.startsWith("/decideur/zones")) {
      return t.pageTitle.zoneAttendance;
    } else if (pathname.startsWith("/decideur/rapports")) {
      return t.pageTitle.reports;
    } else if (pathname.startsWith("/decideur/settings")) {
      return t.settings.title;
    } else if (pathname.startsWith("/commercial/clients")) {
      return t.pageTitle.clientManagement;
    } else if (pathname.startsWith("/commercial/sales")) {
      return t.pageTitle.salesManagement;
    } else if (pathname.startsWith("/commercial/offers")) {
      return t.pageTitle.offers;
    } else if (pathname.startsWith("/admin/environments")) {
      return t.environments.title;
    } else if (pathname.startsWith("/admin/users")) {
      return t.pageTitle.userManagement;
    } else if (pathname.startsWith("/admin/settings")) {
      return t.settings.title;
    }
    return t.navigation.dashboard; // Default fallback
  };

  const getThemeIcon = () => {
    switch (settings.theme) {
      case "dark":
        return Moon;
      case "light":
        return Sun;
      case "system":
        return Monitor;
      default:
        return Sun;
    }
  };

  const getNextTheme = () => {
    switch (settings.theme) {
      case "light":
        return "dark";
      case "dark":
        return "system";
      case "system":
        return "light";
      default:
        return "dark";
    }
  };

  const getThemeTooltip = () => {
    switch (settings.theme) {
      case "light":
        return t.settings.light;
      case "dark":
        return t.settings.dark;
      case "system":
        return t.settings.system;
      default:
        return t.settings.light;
    }
  };

  const toggleTheme = () => {
    const nextTheme = getNextTheme();
    updateSettings({ theme: nextTheme });
  };

  const languages = [
    { code: "fr", name: t.settings.french, flag: "🇫🇷" },
    { code: "en", name: t.settings.english, flag: "🇺🇸" },
    { code: "ar", name: t.settings.arabic, flag: "🇩🇿" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === settings.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    updateLanguage(languageCode);
    setShowLanguageDropdown(false);
  };

  const ThemeIcon = getThemeIcon();

  return (
    <>
      {!isAuthRoute && (
        <div
          className={`bg-white dark:bg-black text-black dark:text-white z-50 py-2 xl:py-3 mb-4 border-b border-[#E6EFF5] dark:border-white/10 font-futura sticky top-0 w-full flex items-center justify-between ${
            isRTL ? "flex-row-reverse" : ""
          }`}
          dir={isRTL ? "rtl" : "ltr"}>
          <div
            className={`text-xl xl:text-2xl ${
              isRTL ? "text-right" : "text-left"
            }`}>
            {getTitle()}
          </div>

          <div
            className={`flex items-center gap-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}>
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="p-2 rounded-lg hover:bg-black-10 dark:hover:bg-white/10 transition-colors duration-200 group flex items-center gap-2"
                title={t.settings.languageSection}
                aria-label={`Current language: ${currentLanguage.name}. Click to change language.`}>
                <Globe className="w-5 h-5 text-black-50 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
                <span className="text-sm font-medium hidden sm:inline">
                  {currentLanguage.flag}
                </span>
              </button>

              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div
                  className={`absolute top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[150px] z-50 ${
                    isRTL ? "left-0" : "right-0"
                  }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3 ${
                        settings.language === lang.code
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      } ${
                        isRTL ? "text-right flex-row-reverse" : "text-left"
                      }`}>
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-black-10 dark:hover:bg-white/10 transition-colors duration-200 group"
              title={getThemeTooltip()}
              aria-label={`Current theme: ${getThemeTooltip()}. Click to change theme.`}>
              <ThemeIcon className="w-5 h-5 text-black-50 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
            </button>

            {/* Avatar */}
            <Image
              src="/assets/layout/avatar.svg"
              width={50}
              height={50}
              alt={t.navigation.profile}
              className=" scale-75"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
