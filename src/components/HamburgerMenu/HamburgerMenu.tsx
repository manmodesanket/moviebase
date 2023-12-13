"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import DiscoverIcon from "../discoverIcon";
import TrendingIcon from "../trendingIcon";

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
              className={`flex items-center justify-start rounded-md p-2 w-full ${
                isCurrentPath("discover") ? "bg-slate-200" : ""
              } hover:bg-slate-200`}
              href="/discover"
            >
              <span>
                <DiscoverIcon />
              </span>
              <span className="ml-2">Discover</span>
            </Link>
            <Link
              className={`flex items-center justify-start rounded-md p-2 w-full ${
                isCurrentPath("trending") ? "bg-slate-200" : ""
              } hover:bg-slate-200`}
              href="/trending"
            >
              <span>
                <TrendingIcon />
              </span>
              <span className="ml-2">Trending</span>
            </Link>
          </div>
        </div>
      </div>
    </Menu>
  );
}
