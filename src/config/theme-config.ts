const THEMES = {
  production: {
    background: "bg-[#fafafa]",
    sidebar: {
      bg: "bg-white",
      activeMenu: "bg-[#7645D914]",
      hoverMenu: "hover:bg-[#7645D914]",
      iconHead: "text-[#999999]",
      hoverIcon: "group-hover:text-[#783cf1]",
      activeIcon: "text-[#783cf1]",
      text: "text-midnight-indigo",
      hoverText: "hover:text-[#783cf1]",
      activeText: "text-[#783cf1]",
      border: "border-[#783cf1]",
      dot: "text-[#9c84f4]",
    },
    navbar: {
      bg: {
        default: "bg-transparent",
        scrolled: "bg-white",
      },
      title: "text-[#7645d9]",
    },
    header: {
      title: "text-midnight-indigo",
      hover: "hover:bg-gray-100",
    },
    menuButton: {
      container: "bg-[#faf9fa]",
      divider: "border-gray-100",
      text: "text-lavender-mist",
      activeMenu: "bg-[#7645D914] hover:bg-[#7645d91e]",
      hoverMenu: "hover:bg-gray-100",
    },
  },
  uat: {
    background: "bg-[#fff5f8]",
    sidebar: {
      bg: "bg-pink-50",
      activeMenu: "bg-[#ce476b14]",
      hoverMenu: "hover:bg-[#ce476b14]",
      iconHead: "text-pink-600",
      hoverIcon: "group-hover:text-[#ce476b]",
      activeIcon: "text-[#ce476b]",
      text: "text-pink-800",
      hoverText: "hover:text-[#ce476b]",
      activeText: "text-[#ce476b]",
      border: "border-[#ce476b]",
      dot: "text-[#f17a9a]",
    },
    navbar: {
      bg: {
        default: "bg-transparent",
        scrolled: "bg-pink-50",
      },
      title: "text-pink-700",
    },
    header: {
      title: "text-pink-700",
      hover: "hover:bg-pink-100",
    },
    menuButton: {
      container: "bg-pink-100",
      divider: "border-pink-200",
      text: "text-pink-400",
      activeMenu: "bg-[#ce476b14] hover:bg-pink-200",
      hoverMenu: "hover:bg-[#ce476b14]",
    },
  },
  development: {
    background: "bg-[#f0f7ff]",
    sidebar: {
      bg: "bg-blue-50",
      activeMenu: "bg-[#2563eb14]",
      hoverMenu: "hover:bg-[#2563eb14]",
      iconHead: "text-blue-600",
      hoverIcon: "group-hover:text-[#2563eb]",
      activeIcon: "text-[#2563eb]",
      text: "text-blue-800",
      hoverText: "hover:text-[#2563eb]",
      activeText: "text-[#2563eb]",
      border: "border-[#2563eb]",
      dot: "text-[#60a5fa]",
    },
    navbar: {
      bg: {
        default: "bg-transparent",
        scrolled: "bg-blue-50",
      },
      title: "text-blue-700",
    },
    header: {
      title: "text-blue-700",
      hover: "hover:bg-blue-100",
    },
    menuButton: {
      container: "bg-blue-100",
      divider: "border-blue-200",
      text: "text-blue-400",
      activeMenu: "bg-[#2563eb14] hover:bg-blue-200",
      hoverMenu: "hover:bg-[#2563eb14]",
    },
  },
};

export const getCurrentTheme = () => {
  const ENV = process.env.NEXT_PUBLIC_ENV || "development";
  return THEMES[ENV as keyof typeof THEMES] || THEMES.development;
};

export const getEnvironmentIndicator = (compact = false) => {
  const ENV = process.env.NEXT_PUBLIC_ENV || "development";

  switch (ENV) {
    case "uat":
      return {
        label: "UAT",
        badgeColor: "bg-pink-600",
        textColor: "text-white",
        show: true,
      };
    case "development":
      return {
        label: compact ? "DEV" : "DEVELOPMENT",
        badgeColor: "bg-blue-600",
        textColor: "text-white",
        show: true,
      };
    case "production":
    default:
      return {
        label: "PRODUCTION",
        badgeColor: "bg-green-500",
        textColor: "text-white",
        show: false,
      };
  }
};
