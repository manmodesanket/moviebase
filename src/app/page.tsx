"use client";

import { Input } from "@/components";
import { Button } from "@/components/shadcn-ui/button";
import { options } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  if (!url) return null;
  return fetch(url, options).then((res) => res.json());
};

export default function Component() {
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/top_rated`,
    fetcher,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event?.target?.value || "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/discover?search=${inputText}`); // Navigate with query param
  };

  return (
    <div className="bg-gray-50/90">
      <div className="grid gap-4 lg:px-64 md:px-32 px-4 py-8 w-full">
        <div className="flex flex-col items-center justify-center space-y-4 text-center w-full">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Moviebase
            </h1>
            <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The best place to find and rate your favorite movies.
            </p>
          </div>
          <div className="space-y-2">
            <div className="relative rounded-lg">
              <div className="absolute inset-y-0 flex h-5 items-center left-3 text-gray-500 w-5" />
              <form
                className="flex flex-col md:flex-row gap-2"
                onSubmit={handleSubmit}
              >
                <div>
                  <Input
                    className="w-[300px] mr-4"
                    placeholder="Search for a movie..."
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Button className="text-white" type="submit">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-center gap-4">
            <Link className="text-xl underline" href="/discover">
              Discover
            </Link>
            <Link className="text-xl underline" href="/trending">
              Trending
            </Link>
          </div>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-1 lg:gap-10 w-full">
          <div className="flex flex-col items-center justify-center space-y-2 lg:order-2 lg:space-y-4 lg:mx-0">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Top Movies
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Based on user ratings
              </p>
            </div>
            <ul className="grid gap-4 sm:gap-6 lg:gap-8">
              {!error &&
                !isLoading &&
                data &&
                data.results.map((item: any, i: number) => (
                  <li className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
                    <div className="text-2xl font-bold">{i + 1}.</div>
                    <div className="grid gap-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.overview}
                      </p>
                    </div>
                    <div className="text-right">
                      {item.vote_average && item.vote_average.toFixed(1)}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
