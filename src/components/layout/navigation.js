import { ChartColumn, Contact, Database, Music2, Settings, Smartphone, Upload } from "lucide-react";

/** Sidebar order matters — Upload is the landing tab. */
export const NAV_ITEMS = [
  {
    to: "/upload",
    label: "Upload",
    icon: Upload,
    description: "Import spreadsheets",
  },
  {
    to: "/data",
    label: "Data",
    icon: Database,
    description: "Browse saved records",
  },
  {
    to: "/reports",
    label: "Reports",
    icon: ChartColumn,
    description: "Insights and exports",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Workspace preferences",
  },
  {
    to: "/music",
    label: "Music",
    icon: Music2,
    description: "Village vibes & tunes",
  },
  {
    to: "/try-phone",
    label: "Try on Phone",
    icon: Smartphone,
    description: "Scan a QR to open on mobile",
    // Desktop gets a floating button (TryOnPhoneButton) instead — see Sidebar.jsx.
    mobileOnly: true,
  },
  {
    to: "/about",
    label: "About",
    icon: Contact,
    description: "Meet the developer",
  },
];

export default NAV_ITEMS;
