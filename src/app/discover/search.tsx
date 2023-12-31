"use client";

import { Input } from "@/components";
import MovieList from "./movielist";
import { Suspense, useState } from "react";
import MoviesSkeleton from "./moviesSkeleton";
import useDebounce from "@/lib/useDebounce";

export default function Search() {
  const [input, setInput] = useState("");

  const debouncedSearch = useDebounce(input, 1000);

  return (
    <div className="p-2 lg:p-0">
      <section>
        <Input
          className="lg:pr-4 mt-4"
          type="text"
          placeholder="Search to discover"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </section>
      <section>
        <Suspense fallback={<MoviesSkeleton />}>
          <MovieList query={debouncedSearch} />
        </Suspense>
      </section>
    </div>
  );
}
