"use client";

import { Input, MoviesSkeleton } from "@/components";
import { Button } from "@/components/shadcn-ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { options } from "@/lib/utils";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import MovieList from "./movielist";

export default function DiscoverMoviesByFilter() {
  const [rating, setRatings] = useState<number | null>(null);
  const [year, setYear] = useState("");
  const [currentLang, setCurrentLang] = useState("");
  const [currentGenre, setCurrentGenre] = useState("");

  const [languages, setLanguages] = useState<
    Array<{ iso_639_1: string; english_name: string; name: string }>
  >([]);
  const [genres, setGenres] = useState<Array<{ id: string; name: string }>>([]);
  const [endpoint, setEndpoint] = useState("");

  const ratingsList = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      const parsedNumber = parseInt(inputValue, 10);
      setYear(parsedNumber.toString());
    }
  };

  const handleSearch = async () => {
    const endpointUrl = `https://api.themoviedb.org/3/discover/movie?vote_average.gte=${
      rating || ""
    }&primary_release_date.gte=${
      year.length > 0 ? year.concat("-01-01") : ""
    }&primary_release_date.lte=${
      year.length > 0 ? year.concat("-12-31") : ""
    }&with_original_language=${currentLang || ""}&with_genres=${
      currentGenre || ""
    }`;
    setEndpoint(endpointUrl);
  };

  const getLanguages = async () => {
    const endpoint = "https://api.themoviedb.org/3/configuration/languages";
    const data = await fetch(endpoint, options).then((res) => res.json());
    setLanguages(data);
  };

  const getGenres = async () => {
    const endpoint = "https://api.themoviedb.org/3/genre/movie/list";
    const data = await fetch(endpoint, options).then((res) => res.json());
    setGenres(data.genres);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className="mt-4">
      <section className="flex flex-wrap gap-4">
        <div>
          <Select
            onValueChange={(value) => {
              setRatings(Number(value));
            }}
            value={rating?.toString()}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Ratings" />
            </SelectTrigger>
            <SelectContent className="opacity-100 bg-white">
              {ratingsList.map((item) => (
                <SelectItem
                  className="hover:bg-gray-100 "
                  key={item}
                  value={item.toString()}
                >
                  {item.toString()}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              setCurrentLang(value);
            }}
            value={currentLang}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="opacity-100 bg-white">
              {languages.map((item) => (
                <SelectItem
                  className="hover:bg-gray-100 "
                  key={item.iso_639_1}
                  value={item.iso_639_1}
                >
                  {item.iso_639_1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              setCurrentGenre(value);
            }}
            value={currentGenre}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="opacity-100 bg-white">
              {genres.map((item) => (
                <SelectItem
                  className="hover:bg-gray-100 "
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          onChange={handleInputChange}
          className="w-[100px]"
          placeholder="Year"
          value={year}
        />
        <Button className="text-textWhite" onClick={() => handleSearch()}>
          Search
        </Button>
      </section>
      <section className="mb-12">
        <Suspense fallback={<MoviesSkeleton />}>
          <MovieList query={endpoint} />
        </Suspense>
      </section>
    </div>
  );
}
