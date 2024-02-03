"use client";
import { useState } from "react";
import TrendingMovies from "./trendingMovies";
import { SelectTrendingPeriod } from "./selectTrendingPeriod";

type trendingTimeType = "day" | "week";

export default function Trending() {
  const [trendingTime, setTrendingTime] = useState<trendingTimeType>("day");

  return (
    <div className="px-2">
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Trending {trendingTime === "day" ? "today" : "this week"}
        </h2>
        <SelectTrendingPeriod
          period={trendingTime}
          setPeriod={setTrendingTime}
        />
      </section>
      <section>
        <TrendingMovies period={trendingTime} />
      </section>
    </div>
  );
}
