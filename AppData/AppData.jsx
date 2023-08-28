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

// SidebarRoutes is an array of objects that contains the name, href, and icon of each route in the sidebar
const SidebarRoutes = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <LayoutDashboard
        size={16}
        color='skyblue'
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
        color='violet'
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
        color='#008000'
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
        color='#FF0000'
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
        color='#800080'
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
        color='#FFA500'
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
        color='#808080
        '
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
        color='violet'
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
        color='#008000'
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
        color='#FF0000'
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
        color='#800080'
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
        color='#FFA500'
      />
    ),
  },
];
export { SidebarRoutes, Tools };
