import React from "react";
import Link from "next/link";

export default function NavMobile() {
  return (
    <section className="sm:hidden w-full bg-white fixed bottom-0 h-10 flex items-center justify-around z-10">
      <div className="w-1/2 h-full flex justify-center items-center">
        <Link href="/discover" className="font-bold">
          Discover
        </Link>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Link href="/trending" className="font-bold">
          Trending
        </Link>
      </div>
    </section>
  );
}
