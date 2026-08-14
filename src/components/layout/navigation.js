import {
  BookOpen,
  ChartColumn,
  Contact,
  Database,
  Music2,
  PawPrint,
  Settings,
  Upload,
} from "lucide-react";

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
    to: "/zoo",
    label: "Zoo",
    icon: PawPrint,
    description: "Lucknow Zoo mini-site",
  },
  {
    to: "/poem",
    label: "Rashmirathi",
    icon: BookOpen,
    description: "रश्मिरथी — दिनकर",
  },
  {
    to: "/music",
    label: "Music",
    icon: Music2,
    description: "Village vibes & tunes",
  },
  {
    to: "/about",
    label: "About",
    icon: Contact,
    description: "Meet the developer",
  },
];

export default NAV_ITEMS;
