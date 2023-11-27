"use client";
import { Suspense, useState } from "react";
import { MoviesSkeleton } from "@/components";
import TrendingToday from "./trendingMovies";
import { SelectTrendingPeriod } from "./selectTrendingPeriod";

type trendingTimeType = "day" | "week";

export default function Trending() {
  const [trendingTime, setTrendingTime] = useState<trendingTimeType>("day");

  return (
    <main
      id="page-content"
      className="flex flex-col lg:p-24 p-4 lg:col-span-10"
    >
      <section className="flex justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Trending {trendingTime === "day" ? "today" : "this week"}
        </h1>
        <SelectTrendingPeriod
          period={trendingTime}
          setPeriod={setTrendingTime}
        />
      </section>
      <section>
        <TrendingToday period={trendingTime} />
      </section>
    </main>
  );
}
