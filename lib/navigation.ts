export const NAV_LINKS = [
  { label: "Route", href: "/route", hasIcon: true },
  { label: "Instructions", href: "/instructions", hasIcon: false },
  { label: "FAQ", href: "/faq", hasIcon: true },
  { label: "History", href: "/history", hasIcon: false },
  { label: "Contact Us", href: "/contact", hasIcon: false },
];

export const AUTH_LINKS = [
  { label: "Log in", href: "/login", hasIcon: false },
  { label: "Register now", href: "/register", hasIcon: false },
];

export const ALL_LINKS = [...NAV_LINKS, ...AUTH_LINKS];
