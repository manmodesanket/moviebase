"use client";

import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { MoviesSkeleton } from "@/components";
import PaginationComponent from "@/components/pagination";
import { options } from "@/lib/utils";
import MovieCard from "@/components/moviecard";

type trendingTimeType = "day" | "week";

const fetcher = (url: string) => {
  if (!url) return null;
  return fetch(url, options).then((res) => res.json());
};

// /giYuvpmpZbwkT3NtX4WdNYqGhxw.jpg
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

export default function TrendingMovies({
  period,
}: {
  period: trendingTimeType;
}) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/trending/movie/${period}?page=${pageIndex}`,
    fetcher,
  );

  return (
    <div className="mt-8 mb-12">
      {error && <p className="text-center">Something went wrong!</p>}
      {isLoading && <MoviesSkeleton />}
      {!error && !data && !isLoading && (
        <p className="text-center">
          Data not available that matches your query
        </p>
      )}
      {!error && data && !isLoading && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {data.results &&
              data.results.map((item: any) => <MovieCard movieData={item} />)}
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
