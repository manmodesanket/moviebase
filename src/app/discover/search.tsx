"use client";

import { Input } from "@/components";
import MovieList from "./movielist";
import { Suspense, useState } from "react";
import Loading from "./loading";

export default function Search() {
  const [input, setInput] = useState("");
  return (
    <div className="lg:pr-72 mt-4">
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
        <Suspense fallback={<Loading />}>
          <MovieList query={input} />
        </Suspense>
      </section>
    </div>
  );
}
