"use client";
import MovieCard from "@/components/moviecard";
import PaginationComponent from "@/components/pagination";
import { options } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  if (!url) return null;
  return fetch(url, options).then((res) => res.json());
};

export default function MovieList({ query }: { query: string | null }) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    query ? `${query}&page=${pageIndex}` : null,
    fetcher,
    { suspense: true },
  );

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <div className="mt-8">
      {error && <p className="text-center">Something went wrong!</p>}
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
              <MovieCard movieData={item} />
            ))}
          </div>
          <div className="my-12">
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
