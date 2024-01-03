"use client";
import PaginationComponent from "@/components/pagination";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMBD_API_KEY}`,
  },
};

const fetcher = (url: string) => {
  if (!url) return null;
  return fetch(url, options).then((res) => res.json());
};

const NoImagePlaceholder = () => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="215" height="330" role="img" aria-label="No Image Available">
      <rect width="100%" height="100%" fill="transparent" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="gray">
        No Image
      </text>
    </svg>
  `;

  const encodedSvg = encodeURIComponent(svgString);
  const dataUri = `data:image/svg+xml,${encodedSvg}`;

  return (
    <div className="">
      <Image
        className="bg-gray-200 rounded-md overflow-hidden "
        src={dataUri}
        alt="No Image Available"
        width={210}
        height={315}
      />
    </div>
  );
};

export default function MovieList({ query }: { query: string }) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageIndex}`
      : null,
    fetcher,
    { suspense: true },
  );

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <div className="mt-8">
      {error && <p className="text-center">Something went wrong!</p>}
      {!error && !query && (
        <p className="text-center">Search something to discover movies</p>
      )}
      {!error && query && !data && (
        <p className="text-center">
          Data not available that matches your query
        </p>
      )}
      {!error && data && (
        <div>
          <h2 className="ml-2 text-xl font-semibold tracking-tight">
            Movie list
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {data.results.map((item: any) => (
              <article className="p-2" key={item.id}>
                {item.poster_path ? (
                  <Image
                    alt={item.title}
                    className="overflow-hidden rounded-md"
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width={210}
                    height={315}
                  />
                ) : (
                  <NoImagePlaceholder />
                )}
                <div className="font-semibold">{item.title}</div>
              </article>
            ))}
          </div>
          <div className="my-4">
            <PaginationComponent
              pages={data.total_pages <= 5 ? data.total_pages : 5}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
}
