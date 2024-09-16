import {
  MdDashboard,
  MdDescription,
  MdHowToVote,
  MdRateReview,
  MdAssessment,
  MdSettings,
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
    name: "Settings",
    path: "/admin/settings",
    icon: MdSettings,
  },
];
