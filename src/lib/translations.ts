export interface TranslationStrings {
  // Common/Shared
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  delete: string;
  edit: string;
  save: string;
  add: string;
  search: string;
  filter: string;
  actions: string;
  status: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  noData: string;

  // Page Titles - NEW SECTION
  pageTitle: {
    userManagement: string;
    zoneAttendance: string;
    reports: string;
    clientManagement: string;
    salesManagement: string;
    offers: string;
  };

  // Settings (from your existing settings page)
  settings: {
    title: string;
    subtitle: string;
    languageSection: string;
    themeSection: string;
    displaySection: string;
    dataSection: string;
    itemsPerPage: string;
    autoRefresh: string;
    autoRefreshDesc: string;
    saveButton: string;
    saving: string;
    saveSuccess: string;
    saveError: string;
    elements: string;
    // Language options
    autoDetect: string;
    french: string;
    english: string;
    arabic: string;
    // Theme options
    light: string;
    dark: string;
    system: string;
    // Refresh intervals
    disabled: string;
    seconds: string;
    minute: string;
    minutes: string;
    logsSection: string;
    downloadLogs: string;
    downloadAllLogs: string;
    viewLogList: string;
    downloadByType: string;
    downloadErrorLogs: string;
    downloadWarnLogs: string;
    downloadInfoLogs: string;
    downloadAllTextLogs: string;
    downloadSuccess: string;
    downloadError: string;
  };

  // Environments page
  environments: {
    title: string;
    subtitle: string;
    addEnvironment: string;
    editEnvironment: string;
    deleteEnvironment: string;
    environmentName: string;
    environmentDescription: string;
    environmentType: string;
    environmentUrl: string;
    environmentStatus: string;
    lastChecked: string;
    createdAt: string;
    updatedAt: string;
    noEnvironments: string;
    noEnvironmentsDesc: string;
    searchPlaceholder: string;
    filterByStatus: string;
    filterByType: string;
    allStatuses: string;
    allTypes: string;

    // Status values
    active: string;
    inactive: string;
    maintenance: string;
    error: string;

    // Environment types
    production: string;
    staging: string;
    development: string;
    testing: string;

    // Actions
    viewDetails: string;
    editDetails: string;
    deleteConfirm: string;
    deleteConfirmDesc: string;

    // Form labels
    formName: string;
    formDescription: string;
    formType: string;
    formUrl: string;
    formStatus: string;

    // Form placeholders
    namePlaceholder: string;
    descriptionPlaceholder: string;
    urlPlaceholder: string;

    // Validation messages
    nameRequired: string;
    urlRequired: string;
    urlInvalid: string;

    // Success/Error messages
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
    createError: string;
    updateError: string;
    deleteError: string;

    // Pagination
    showing: string;
    of: string;
    entries: string;
    previous: string;
    next: string;

    // Refresh
    refreshing: string;
    lastRefresh: string;
    refreshNow: string;
  };

  // Navigation
  navigation: {
    dashboard: string;
    environments: string;
    settings: string;
    logout: string;
    profile: string;
    // Sidebar navigation
    users: string;
    devices: string;
    clients: string;
    sales: string;
    offers: string;
    zones: string;
    dataAnalysis: string;
    reports: string;
  };

  addEnvCard: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    visibilityLabel: string;
    visibilityPublic: string;
    userLabel: string;
    userPlaceholder: string;
    loadingUsers: string;
    noUserSelected: string;
    unknownUser: string;
  };

  // Date/Time formatting
  dateTime: {
    now: string;
    today: string;
    yesterday: string;
    daysAgo: string;
    hoursAgo: string;
    minutesAgo: string;
    secondsAgo: string;
    never: string;
  };
}

export const translations: Record<string, TranslationStrings> = {
  fr: {
    addEnvCard: {
      title: "Informations",
      nameLabel: "Nom",
      namePlaceholder: "Nom de l'environnement...",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Description de l'environnement...",
      addressLabel: "Adresse",
      addressPlaceholder: "Adresse de l'environnement",
      visibilityLabel: "Visibilité",
      visibilityPublic: "Public",
      userLabel: "Utilisateur",
      userPlaceholder: "Sélectionnez un utilisateur",
      loadingUsers: "Chargement des utilisateurs...",
      noUserSelected: "Aucun utilisateur sélectionné",
      unknownUser: "Utilisateur inconnu",
    },

    // Common/Shared
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    confirm: "Confirmer",
    delete: "Supprimer",
    edit: "Modifier",
    save: "Sauvegarder",
    add: "Ajouter",
    search: "Rechercher",
    filter: "Filtrer",
    actions: "Actions",
    status: "Statut",
    name: "Nom",
    description: "Description",
    created: "Créé",
    updated: "Mis à jour",
    noData: "Aucune donnée disponible",

    // Page Titles - NEW SECTION
    pageTitle: {
      userManagement: "Gestion des utilisateurs",
      zoneAttendance: "Fréquentation des zones",
      reports: "Rapports",
      clientManagement: "Gestion des clients",
      salesManagement: "Gestion des ventes",
      offers: "Offres",
    },

    settings: {
      logsSection: "Gestion des journaux",
      downloadLogs: "Télécharger les journaux",
      downloadAllLogs: "Télécharger tous les journaux (ZIP)",
      viewLogList: "Voir la liste des journaux",
      downloadByType: "Télécharger par type",
      downloadErrorLogs: "Journaux d'erreur",
      downloadWarnLogs: "Journaux d'avertissement",
      downloadInfoLogs: "Journaux d'information",
      downloadAllTextLogs: "Tous les journaux (texte)",
      downloadSuccess: "Téléchargement réussi",
      downloadError: "Erreur de téléchargement",
      title: "Paramètres",
      subtitle: "Configurez vos préférences d'administration",
      languageSection: "Langue de l'interface",
      themeSection: "Thème",
      displaySection: "Affichage",
      dataSection: "Gestion des données",
      itemsPerPage: "Éléments par page",
      autoRefresh: "Actualisation automatique",
      autoRefreshDesc:
        "Fréquence d'actualisation automatique des données d'environnement",
      saveButton: "Sauvegarder les paramètres",
      saving: "Sauvegarde...",
      saveSuccess: "Paramètres sauvegardés avec succès !",
      saveError: "Erreur lors de la sauvegarde",
      elements: "éléments",
      autoDetect: "Détection automatique",
      french: "Français",
      english: "English",
      arabic: "العربية",
      light: "Clair",
      dark: "Sombre",
      system: "Système",
      disabled: "Désactivé",
      seconds: "secondes",
      minute: "minute",
      minutes: "minutes",
    },

    environments: {
      title: "Environnements",
      subtitle: "Gérez et surveillez vos environnements de développement",
      addEnvironment: "Ajouter un environnement",
      editEnvironment: "Modifier l'environnement",
      deleteEnvironment: "Supprimer l'environnement",
      environmentName: "Nom de l'environnement",
      environmentDescription: "Description de l'environnement",
      environmentType: "Type d'environnement",
      environmentUrl: "URL de l'environnement",
      environmentStatus: "Statut de l'environnement",
      lastChecked: "Dernière vérification",
      createdAt: "Créé le",
      updatedAt: "Mis à jour le",
      noEnvironments: "Aucun environnement trouvé",
      noEnvironmentsDesc:
        "Commencez par ajouter votre premier environnement pour commencer à surveiller vos applications.",
      searchPlaceholder: "Rechercher des environnements...",
      filterByStatus: "Filtrer par statut",
      filterByType: "Filtrer par type",
      allStatuses: "Tous les statuts",
      allTypes: "Tous les types",

      active: "Actif",
      inactive: "Inactif",
      maintenance: "Maintenance",
      error: "Erreur",

      production: "Production",
      staging: "Test",
      development: "Développement",
      testing: "Tests",

      viewDetails: "Voir les détails",
      editDetails: "Modifier les détails",
      deleteConfirm: "Confirmer la suppression",
      deleteConfirmDesc:
        "Êtes-vous sûr de vouloir supprimer cet environnement ? Cette action ne peut pas être annulée.",

      formName: "Nom",
      formDescription: "Description",
      formType: "Type",
      formUrl: "URL",
      formStatus: "Statut",

      namePlaceholder: "Entrez le nom de l'environnement",
      descriptionPlaceholder: "Entrez une description (optionnel)",
      urlPlaceholder: "https://example.com",

      nameRequired: "Le nom est requis",
      urlRequired: "L'URL est requise",
      urlInvalid: "L'URL n'est pas valide",

      createSuccess: "Environnement créé avec succès",
      updateSuccess: "Environnement mis à jour avec succès",
      deleteSuccess: "Environnement supprimé avec succès",
      createError: "Erreur lors de la création de l'environnement",
      updateError: "Erreur lors de la mise à jour de l'environnement",
      deleteError: "Erreur lors de la suppression de l'environnement",

      showing: "Affichage de",
      of: "sur",
      entries: "entrées",
      previous: "Précédent",
      next: "Suivant",

      refreshing: "Actualisation...",
      lastRefresh: "Dernière actualisation :",
      refreshNow: "Actualiser maintenant",
    },

    navigation: {
      dashboard: "Tableau de bord",
      environments: "Environnements",
      settings: "Paramètres",
      logout: "Déconnexion",
      profile: "Profil",
      // Sidebar navigation
      users: "Utilisateurs",
      devices: "Dispositifs",
      clients: "Clients",
      sales: "Ventes",
      offers: "Offres",
      zones: "Zones",
      dataAnalysis: "Analyse de données",
      reports: "Rapports",
    },

    dateTime: {
      now: "maintenant",
      today: "aujourd'hui",
      yesterday: "hier",
      daysAgo: "jours",
      hoursAgo: "heures",
      minutesAgo: "minutes",
      secondsAgo: "secondes",
      never: "jamais",
    },
  },

  en: {
    addEnvCard: {
      title: "Information",
      nameLabel: "Name",
      namePlaceholder: "Environment name...",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Environment description...",
      addressLabel: "Address",
      addressPlaceholder: "Environment address",
      visibilityLabel: "Visibility",
      visibilityPublic: "Public",
      userLabel: "User",
      userPlaceholder: "Select a user",
      loadingUsers: "Loading users...",
      noUserSelected: "No user selected",
      unknownUser: "Unknown user",
    },
    // Common/Shared
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    add: "Add",
    search: "Search",
    filter: "Filter",
    actions: "Actions",
    status: "Status",
    name: "Name",
    description: "Description",
    created: "Created",
    updated: "Updated",
    noData: "No data available",

    // Page Titles - NEW SECTION
    pageTitle: {
      userManagement: "User Management",
      zoneAttendance: "Zone Attendance",
      reports: "Reports",
      clientManagement: "Client Management",
      salesManagement: "Sales Management",
      offers: "Offers",
    },

    settings: {
      logsSection: "Log Management",
      downloadLogs: "Download Log Files",
      downloadAllLogs: "Download All Logs (ZIP)",
      viewLogList: "View Available Logs",
      downloadByType: "Download by Log Type",
      downloadErrorLogs: "Error Logs",
      downloadWarnLogs: "Warning Logs",
      downloadInfoLogs: "Info Logs",
      downloadAllTextLogs: "All Logs (Text)",
      downloadSuccess: "Download successful",
      downloadError: "Download failed",
      title: "Settings",
      subtitle: "Configure your administration preferences",
      languageSection: "Interface Language",
      themeSection: "Theme",
      displaySection: "Display",
      dataSection: "Data Management",
      itemsPerPage: "Items per page",
      autoRefresh: "Auto refresh",
      autoRefreshDesc: "Automatic refresh frequency for environment data",
      saveButton: "Save Settings",
      saving: "Saving...",
      saveSuccess: "Settings saved successfully!",
      saveError: "Error saving settings",
      elements: "items",
      autoDetect: "Auto detect",
      french: "French",
      english: "English",
      arabic: "Arabic",
      light: "Light",
      dark: "Dark",
      system: "System",
      disabled: "Disabled",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
    },

    environments: {
      title: "Environments",
      subtitle: "Manage and monitor your development environments",
      addEnvironment: "Add Environment",
      editEnvironment: "Edit Environment",
      deleteEnvironment: "Delete Environment",
      environmentName: "Environment Name",
      environmentDescription: "Environment Description",
      environmentType: "Environment Type",
      environmentUrl: "Environment URL",
      environmentStatus: "Environment Status",
      lastChecked: "Last Checked",
      createdAt: "Created At",
      updatedAt: "Updated At",
      noEnvironments: "No environments found",
      noEnvironmentsDesc:
        "Get started by adding your first environment to begin monitoring your applications.",
      searchPlaceholder: "Search environments...",
      filterByStatus: "Filter by status",
      filterByType: "Filter by type",
      allStatuses: "All statuses",
      allTypes: "All types",

      active: "Active",
      inactive: "Inactive",
      maintenance: "Maintenance",
      error: "Error",

      production: "Production",
      staging: "Staging",
      development: "Development",
      testing: "Testing",

      viewDetails: "View Details",
      editDetails: "Edit Details",
      deleteConfirm: "Confirm Delete",
      deleteConfirmDesc:
        "Are you sure you want to delete this environment? This action cannot be undone.",

      formName: "Name",
      formDescription: "Description",
      formType: "Type",
      formUrl: "URL",
      formStatus: "Status",

      namePlaceholder: "Enter environment name",
      descriptionPlaceholder: "Enter description (optional)",
      urlPlaceholder: "https://example.com",

      nameRequired: "Name is required",
      urlRequired: "URL is required",
      urlInvalid: "URL is not valid",

      createSuccess: "Environment created successfully",
      updateSuccess: "Environment updated successfully",
      deleteSuccess: "Environment deleted successfully",
      createError: "Error creating environment",
      updateError: "Error updating environment",
      deleteError: "Error deleting environment",

      showing: "Showing",
      of: "of",
      entries: "entries",
      previous: "Previous",
      next: "Next",

      refreshing: "Refreshing...",
      lastRefresh: "Last refresh:",
      refreshNow: "Refresh now",
    },

    navigation: {
      dashboard: "Dashboard",
      environments: "Environments",
      settings: "Settings",
      logout: "Logout",
      profile: "Profile",
      // Sidebar navigation
      users: "Users",
      devices: "Devices",
      clients: "Clients",
      sales: "Sales",
      offers: "Offers",
      zones: "Zones",
      dataAnalysis: "Data Analysis",
      reports: "Reports",
    },

    dateTime: {
      now: "now",
      today: "today",
      yesterday: "yesterday",
      daysAgo: "days ago",
      hoursAgo: "hours ago",
      minutesAgo: "minutes ago",
      secondsAgo: "seconds ago",
      never: "never",
    },
  },

  ar: {
    addEnvCard: {
      title: "المعلومات",
      nameLabel: "الاسم",
      namePlaceholder: "اسم البيئة...",
      descriptionLabel: "الوصف",
      descriptionPlaceholder: "وصف البيئة...",
      addressLabel: "العنوان",
      addressPlaceholder: "عنوان البيئة",
      visibilityLabel: "الرؤية",
      visibilityPublic: "عام",
      userLabel: "المستخدم",
      userPlaceholder: "اختر مستخدم",
      loadingUsers: "جاري تحميل المستخدمين...",
      noUserSelected: "لا يوجد مستخدم محدد",
      unknownUser: "مستخدم غير معروف",
    },
    // Common/Shared
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    confirm: "تأكيد",
    delete: "حذف",
    edit: "تعديل",
    save: "حفظ",
    add: "إضافة",
    search: "بحث",
    filter: "تصفية",
    actions: "الإجراءات",
    status: "الحالة",
    name: "الاسم",
    description: "الوصف",
    created: "تم الإنشاء",
    updated: "تم التحديث",
    noData: "لا توجد بيانات متاحة",

    // Page Titles - NEW SECTION
    pageTitle: {
      userManagement: "إدارة المستخدمين",
      zoneAttendance: "حضور المناطق",
      reports: "التقارير",
      clientManagement: "إدارة العملاء",
      salesManagement: "إدارة المبيعات",
      offers: "العروض",
    },

    settings: {
      logsSection: "إدارة السجلات",
      downloadLogs: "تحميل ملفات السجل",
      downloadAllLogs: "تحميل جميع السجلات (ZIP)",
      viewLogList: "عرض السجلات المتاحة",
      downloadByType: "تحميل حسب النوع",
      downloadErrorLogs: "سجلات الأخطاء",
      downloadWarnLogs: "سجلات التحذيرات",
      downloadInfoLogs: "سجلات المعلومات",
      downloadAllTextLogs: "جميع السجلات (نص)",
      downloadSuccess: "تم التحميل بنجاح",
      downloadError: "فشل التحميل",
      title: "الإعدادات",
      subtitle: "قم بتكوين تفضيلات الإدارة الخاصة بك",
      languageSection: "لغة الواجهة",
      themeSection: "المظهر",
      displaySection: "العرض",
      dataSection: "إدارة البيانات",
      itemsPerPage: "العناصر في الصفحة",
      autoRefresh: "التحديث التلقائي",
      autoRefreshDesc: "تكرار التحديث التلقائي لبيانات البيئة",
      saveButton: "حفظ الإعدادات",
      saving: "جاري الحفظ...",
      saveSuccess: "تم حفظ الإعدادات بنجاح!",
      saveError: "خطأ في حفظ الإعدادات",
      elements: "عناصر",
      autoDetect: "الكشف التلقائي",
      french: "الفرنسية",
      english: "الإنجليزية",
      arabic: "العربية",
      light: "فاتح",
      dark: "داكن",
      system: "النظام",
      disabled: "معطل",
      seconds: "ثواني",
      minute: "دقيقة",
      minutes: "دقائق",
    },

    environments: {
      title: "البيئات",
      subtitle: "إدارة ومراقبة بيئات التطوير الخاصة بك",
      addEnvironment: "إضافة بيئة",
      editEnvironment: "تعديل البيئة",
      deleteEnvironment: "حذف البيئة",
      environmentName: "اسم البيئة",
      environmentDescription: "وصف البيئة",
      environmentType: "نوع البيئة",
      environmentUrl: "رابط البيئة",
      environmentStatus: "حالة البيئة",
      lastChecked: "آخر فحص",
      createdAt: "تم الإنشاء في",
      updatedAt: "تم التحديث في",
      noEnvironments: "لم يتم العثور على بيئات",
      noEnvironmentsDesc: "ابدأ بإضافة بيئتك الأولى لبدء مراقبة تطبيقاتك.",
      searchPlaceholder: "البحث في البيئات...",
      filterByStatus: "تصفية حسب الحالة",
      filterByType: "تصفية حسب النوع",
      allStatuses: "جميع الحالات",
      allTypes: "جميع الأنواع",

      active: "نشط",
      inactive: "غير نشط",
      maintenance: "صيانة",
      error: "خطأ",

      production: "الإنتاج",
      staging: "الاختبار",
      development: "التطوير",
      testing: "الفحص",

      viewDetails: "عرض التفاصيل",
      editDetails: "تعديل التفاصيل",
      deleteConfirm: "تأكيد الحذف",
      deleteConfirmDesc:
        "هل أنت متأكد من أنك تريد حذف هذه البيئة؟ لا يمكن التراجع عن هذا الإجراء.",

      formName: "الاسم",
      formDescription: "الوصف",
      formType: "النوع",
      formUrl: "الرابط",
      formStatus: "الحالة",

      namePlaceholder: "أدخل اسم البيئة",
      descriptionPlaceholder: "أدخل الوصف (اختياري)",
      urlPlaceholder: "https://example.com",

      nameRequired: "الاسم مطلوب",
      urlRequired: "الرابط مطلوب",
      urlInvalid: "الرابط غير صحيح",

      createSuccess: "تم إنشاء البيئة بنجاح",
      updateSuccess: "تم تحديث البيئة بنجاح",
      deleteSuccess: "تم حذف البيئة بنجاح",
      createError: "خطأ في إنشاء البيئة",
      updateError: "خطأ في تحديث البيئة",
      deleteError: "خطأ في حذف البيئة",

      showing: "عرض",
      of: "من",
      entries: "إدخالات",
      previous: "السابق",
      next: "التالي",

      refreshing: "جاري التحديث...",
      lastRefresh: "آخر تحديث:",
      refreshNow: "تحديث الآن",
    },

    navigation: {
      dashboard: "لوحة التحكم",
      environments: "البيئات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
      // Sidebar navigation
      users: "المستخدمون",
      devices: "الأجهزة",
      clients: "العملاء",
      sales: "المبيعات",
      offers: "العروض",
      zones: "المناطق",
      dataAnalysis: "تحليل البيانات",
      reports: "التقارير",
    },

    dateTime: {
      now: "الآن",
      today: "اليوم",
      yesterday: "أمس",
      daysAgo: "أيام مضت",
      hoursAgo: "ساعات مضت",
      minutesAgo: "دقائق مضت",
      secondsAgo: "ثواني مضت",
      never: "أبداً",
    },
  },
};

// Helper function to get translations for a specific language
export const getTranslations = (language: string): TranslationStrings => {
  return translations[language] || translations.en;
};

// Helper function to detect browser language
export const detectBrowserLanguage = (): string => {
  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "fr") return "fr";
  if (browserLang === "ar") return "ar";
  return "fr"; // Default to French
};

// Hook for using translations in React components
export const useTranslations = (language: string) => {
  return getTranslations(language);
};
