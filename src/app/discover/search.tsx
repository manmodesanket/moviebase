"use client";

import { Input } from "@/components";
import MovieList from "./movielist";
import { Suspense, useState } from "react";
import { MoviesSkeleton } from "@/components";
import useDebounce from "@/lib/useDebounce";

export default function Search() {
  const [input, setInput] = useState("");

  const debouncedSearch = useDebounce(input, 1000);

  const url = debouncedSearch
    ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearch}`
    : null;

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
