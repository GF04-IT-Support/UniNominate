"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { navRoutes } from "@/lib/routes";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      style={{ backgroundColor: "#8B0000" }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          icon={isMenuOpen ? <FaTimes /> : <FaBars />}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-white"
        />
        <NavbarBrand
          className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Avatar src="/logo.png" alt="KNUST Logo" isBordered />
          <p className="font-bold text-white ml-3 italic">KNOMS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-12" justify="center">
        {navRoutes.map((item) => {
          const isActive = pathname === item.path;
          return (
            <NavbarItem
              key={item.path}
              isActive={isActive}
              className="hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <Link
                color="foreground"
                href={item.path}
                className={`text-white underline-offset-8 ${
                  isActive ? "underline font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="Search">
            <FaSearch className="text-white" />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navRoutes.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
