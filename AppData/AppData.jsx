// Import all the icons from lucide-react
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music2Icon,
  Code2Icon,
  Settings2Icon,
} from "lucide-react";

import colors from "@/config/colors";

// SidebarRoutes is an array of objects that contains the name, href, and icon of each route in the sidebar
const SidebarRoutes = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <LayoutDashboard
        size={16}
        color={colors.dashboardIcon}
      />
    ),
  },
  {
    id: 2,
    name: "Conversation",
    href: "/conversation",
    icon: (
      <MessageSquare
        size={16}
        color={colors.messageIcon}
      />
    ),
  },
  {
    id: 3,
    name: "Image Generation",
    href: "/image",
    icon: (
      <ImageIcon
        size={16}
        color={colors.imageIcon}
      />
    ),
  },
  {
    id: 4,
    name: "Video Generation",
    href: "/video",
    icon: (
      <VideoIcon
        size={16}
        color={colors.videoIcon}
      />
    ),
  },
  {
    id: 5,
    name: "Music Generation",
    href: "/music",
    icon: (
      <Music2Icon
        size={16}
        color={colors.musicIcon}
      />
    ),
  },
  {
    id: 6,
    name: "Code Generation",
    href: "/code",
    icon: (
      <Code2Icon
        size={16}
        color={colors.codeIcon}
      />
    ),
  },
  {
    id: 7,
    name: "Settings",
    href: "/settings",
    icon: (
      <Settings2Icon
        size={16}
        color={colors.settingsIcon}
      />
    ),
  },
];

const Tools = [
  {
    id: 1,
    name: "Conversation",
    href: "/conversation",
    icon: (
      <MessageSquare
        size={24}
        color={colors.messageIcon}
      />
    ),
  },
  {
    id: 2,
    name: "Image Generation",
    href: "/image",
    icon: (
      <ImageIcon
        size={24}
        color={colors.imageIcon}
      />
    ),
  },
  {
    id: 3,
    name: "Video Generation",
    href: "/video",
    icon: (
      <VideoIcon
        size={24}
        color={colors.videoIcon}
      />
    ),
  },
  {
    id: 4,
    name: "Music Generation",
    href: "/music",
    icon: (
      <Music2Icon
        size={24}
        color={colors.musicIcon}
      />
    ),
  },
  {
    id: 5,
    name: "Code Generation",
    href: "/code",
    icon: (
      <Code2Icon
        size={24}
        color={colors.codeIcon}
      />
    ),
  },
];
export { SidebarRoutes, Tools };
