"use client";
import Image from "next/image";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";

function CustomBurgerIcon() {
  return <Image alt="burger" src="/burger.svg" width={20} height={20} />;
}

export default function HamburgerMenu({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="space-y-1">
            <button className="w-full justify-start">Discover</button>
            <button className="w-full justify-start">Trending</button>
            <button className="w-full justify-start">Upcoming</button>
          </div>
        </div>
      </div>
    </Menu>
  );
}
