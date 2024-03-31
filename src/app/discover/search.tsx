"use client";

import { Input } from "@/components";
import MovieList from "./movielist";
import { Suspense, useEffect, useState } from "react";
import { MoviesSkeleton } from "@/components";
import useDebounce from "@/lib/useDebounce";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const debouncedSearch = useDebounce(input, 1000);

  const url = debouncedSearch
    ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearch}`
    : null;

  useEffect(() => {
    setInput(search || "");
  }, [search]);

  return (
    <div className="p-2 lg:p-0">
      <section>
        <Input
          className="lg:pr-4 mt-4"
          type="text"
          placeholder="Find the movie you are looking for..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </section>
      <section>
        <Suspense fallback={<MoviesSkeleton />}>
          <MovieList query={url} />
        </Suspense>
      </section>
    </div>
  );
}
