"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";

function CustomBurgerIcon() {
  return <Image alt="burger" src="/burger.svg" width={20} height={20} />;
}

export default function HamburgerMenu({ ...props }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isCurrentPath = (path: string) => {
    if (pathname.includes(path)) return true;
    return false;
  };

  return (
    <Menu
      customBurgerIcon={<CustomBurgerIcon />}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      right
      styles={{
        bmBurgerButton: { background: "white", padding: "0.5rem" },
        bmMenuWrap: { background: "white", height: "30vh", overflow: "auto" },
      }}
      width={"100%"}
      {...props}
    >
      <div className="min-h-screen space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1 flex flex-col">
            <Link
              className={`w-full block ${
                isCurrentPath("discover") ? "underline" : ""
              } text-center`}
              href="/discover"
            >
              Discover
            </Link>
            <Link
              className={`w-full block ${
                isCurrentPath("trending") ? "underline" : ""
              } text-center`}
              href="/trending"
            >
              Trending
            </Link>
            <Link
              className={`w-full block ${
                isCurrentPath("upcoming") ? "underline" : ""
              } text-center`}
              href="/upcoming"
            >
              Upcoming
            </Link>
          </div>
        </div>
      </div>
    </Menu>
  );
}
