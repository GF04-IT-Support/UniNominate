"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { adminRoutes } from "@/lib/routes";
import { Avatar, Divider } from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { Drawer } from "@mui/material";
import { toast } from "react-hot-toast";
import { logoutAdmin } from "@/services/admin/authService";
import { useSession } from "next-auth/react";

const AdminSidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await logoutAdmin();
      router.push("/admin/login");
      toast.dismiss(loadingToast);
      toast.success("Logout successful");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error during logout");
    }
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const sidebarContent = (showText: boolean) => (
    <div
      className={`h-full flex flex-col bg-[#8B0000] text-white ${
        showText ? "w-64" : "w-20"
      }`}
    >
      <div className="p-6 flex flex-col items-center space-y-4">
        <Avatar
          src="/logo.png"
          alt="Logo"
          size="lg"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        />
        {showText && (
          <div className="flex flex-col gap-1 items-center">
            <span className="text-base font-semibold">
              {session?.user?.email}
            </span>
            <span className="text-xs font-semibold">{session?.user?.role}</span>
          </div>
        )}
      </div>
      <Divider className="bg-white/20" />
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {adminRoutes.map((route) => (
            <SidebarItem
              key={route.path}
              icon={<route.icon />}
              text={route.name}
              href={route.path}
              isActive={pathname === route.path}
              showText={showText}
            />
          ))}
        </ul>
      </nav>
      <Divider className="bg-white/20" />
      <motion.div
        className={`flex items-center ${
          showText ? "space-x-4 px-8" : "justify-center"
        } py-6 cursor-pointer text-white hover:bg-red-900`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
      >
        <motion.span className="text-2xl">
          <MdLogout />
        </motion.span>
        {showText && <span className="font-medium">Logout</span>}
      </motion.div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <button onClick={toggleDrawer(true)} className="p-4 text-[#8B0000]">
          <FaBars size={24} />
        </button>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {sidebarContent(true)}
        </Drawer>
      </div>

      <div className="hidden md:block lg:hidden h-screen shadow-lg">
        {sidebarContent(false)}
      </div>

      <div className="hidden lg:block h-screen shadow-lg">
        {sidebarContent(true)}
      </div>
    </>
  );
};

const SidebarItem = ({
  icon,
  text,
  href,
  isActive,
  showText,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  isActive: boolean;
  showText: boolean;
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center ${
          showText ? "space-x-4 px-6" : "justify-center"
        } py-3 transition-colors ${
          isActive ? "bg-white text-[#8B0000]" : "text-white hover:bg-red-900"
        }`}
      >
        <motion.span
          className={`text-2xl ${isActive ? "text-[#8B0000]" : "text-white"}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.span>
        {showText && (
          <span className={`font-medium ${isActive ? "text-[#8B0000]" : ""}`}>
            {text}
          </span>
        )}
        {isActive && (
          <motion.div
            className={`absolute left-0 w-1 h-8 ${
              isActive ? "bg-[#8B0000]" : "bg-white"
            }`}
            layoutId="activeIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Link>
    </li>
  );
};

export default AdminSidebar;
