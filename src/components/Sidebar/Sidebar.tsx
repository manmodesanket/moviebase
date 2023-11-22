"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({}) {
  const pathname = usePathname();

  const isCurrentPath = (path: string) => {
    if (pathname.includes(path)) return true;
    return false;
  };

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1 flex flex-col">
          <Link
            className={`w-full ${
              isCurrentPath("discover") ? "underline" : ""
            } text-center`}
            href="/discover"
          >
            Discover
          </Link>
          <Link
            className={`w-full ${
              isCurrentPath("trending") ? "underline" : ""
            } text-center`}
            href="/trending"
          >
            Trending
          </Link>
          <Link
            className={`w-full ${
              isCurrentPath("upcoming") ? "underline" : ""
            } text-center`}
            href="/upcoming"
          >
            Upcoming
          </Link>
        </div>
      </div>
    </div>
  );
}
