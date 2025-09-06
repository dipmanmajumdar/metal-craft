"use client";
import Link from "next/link";
import type { Transition } from "motion/react";
import React, { useState } from "react";
import { motion } from "motion/react";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  // ⚠️ remove restDelta & restSpeed — not in v11 types
};



// ---------- Subcomponents ----------
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-80 dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && active === item && (
<motion.div
  initial={{ opacity: 0, scale: 0.85, y: 10 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={transition}
  className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2 pt-4"
>
  <motion.div
    transition={transition}
    layoutId="active"
    className="bg-gray-50 dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 dark:border-white/20 shadow-xl"
  >
    <motion.div layout className="w-max h-full p-4">
      {children}
    </motion.div>
  </motion.div>
</motion.div>

      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/20 bg-white shadow-lg flex items-center space-x-6 px-8 py-4"
    >
      {/* Logo (left side) */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <img
            src="/logo.jpg" // your logo path
            alt="Logo"
            className="w-10 h-10 rounded-full shadow-md cursor-pointer"
          />
        </Link>
      </div>

      {/* Nav items */}
      <div className="flex space-x-6">{children}</div>
    </nav>
  );
};



export const HoveredLink = ({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white"
    >
      {children}
    </a>
  );
};

// ---------- Main NavbarMenu Component ----------
export default function NavbarMenu() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed top-6 inset-x-0 mx-auto w-max z-50">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <HoveredLink href="/">Go to Home</HoveredLink>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Dashboard">
        <ul className="flex flex-col gap-2">
        <li><HoveredLink href="/dashboard">Analytics</HoveredLink></li>
        <li><HoveredLink href="/reports">Reports</HoveredLink></li>
        </ul>
          
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="About">
        <ul className="flex flex-col gap-2">
        <li><HoveredLink href="/about">Our Mission</HoveredLink></li>
        <li><HoveredLink href="/team">Team</HoveredLink></li>
        </ul>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Login">
          <HoveredLink href="/login">Sign In</HoveredLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
