"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Flame } from "lucide-react";

export default function Sidebar({}) {
  const pathname = usePathname();

  const isCurrentPath = (path: string) => {
    if (pathname.includes(path)) return true;
    return false;
  };

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Moviebase
      </h1>
      <div className="px-3 py-2">
        <div className="space-y-1 flex flex-col">
          <Link
            className={`flex items-center justify-start rounded-md p-2 w-full ${
              isCurrentPath("discover") ? "bg-slate-200" : ""
            } hover:bg-slate-200`}
            href="/discover"
          >
            <span>
              <Search />
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
              <Flame />
            </span>
            <span className="ml-2">Trending</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
