import {
  MdDashboard,
  MdDescription,
  MdHowToVote,
  MdRateReview,
  MdAssessment,
  MdSettings,
  MdPeople,
} from "react-icons/md";

export const adminRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Nominations",
    path: "/admin/nominations",
    icon: MdHowToVote,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: MdRateReview,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: MdAssessment,
  },
  {
    name: "Admins",
    path: "/admin/manage-admins",
    icon: MdPeople,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: MdSettings,
  },
];

export const navRoutes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Nominations",
    path: "/nominations",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
