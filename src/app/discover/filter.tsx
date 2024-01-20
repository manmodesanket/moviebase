"use client";

import { Input } from "@/components";
import PaginationComponent from "@/components/pagination";
import { Button } from "@/components/shadcn-ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { options } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

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

export default function DiscoverMoviesByFilter() {
  const [rating, setRatings] = useState<number | null>(null);
  const [year, setYear] = useState("");
  const [currentLang, setCurrentLang] = useState("");
  const [currentGenre, setCurrentGenre] = useState("");

  const [data, setData] = useState<any>(null);

  const [pageIndex, setPageIndex] = useState(1);
  const [languages, setLanguages] = useState<
    Array<{ iso_639_1: string; english_name: string; name: string }>
  >([]);
  const [genres, setGenres] = useState<Array<{ id: string; name: string }>>([]);

  const ratingsList = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      const parsedNumber = parseInt(inputValue, 10);
      setYear(parsedNumber.toString());
    }
  };

  const handleSearch = async (newPage: number) => {
    const endpoint = `https://api.themoviedb.org/3/discover/movie?vote_average.gte=${
      rating || ""
    }&primary_release_date.gte=${
      year.length > 0 ? year.concat("-01-01") : ""
    }&primary_release_date.lte=${
      year.length > 0 ? year.concat("-12-31") : ""
    }&with_original_language=${currentLang || ""}&with_genres=${
      currentGenre || ""
    }&page=${newPage}`;
    const data = await fetch(endpoint, options).then((res) => res.json());
    setData(data);
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
      <section className="flex flex-wrap">
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
            <SelectContent className="opacity-100">
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
        <div className="ml-2">
          <Select
            onValueChange={(value) => {
              setCurrentLang(value);
            }}
            value={currentLang}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="opacity-100">
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
        <div className="ml-2">
          <Select
            onValueChange={(value) => {
              setCurrentGenre(value);
            }}
            value={currentGenre}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="opacity-100">
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
          className="ml-2 w-[100px]"
          placeholder="Year"
          value={year}
        />
        <Button
          className="ml-2 text-textWhite"
          onClick={() => {
            setPageIndex(1);
            handleSearch(1);
          }}
        >
          Search
        </Button>
      </section>
      {data && (
        <section className="mt-4 z-10">
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
        </section>
      )}
      {data && (
        <section className="ml-2">
          <div className="my-4">
            <PaginationComponent
              pages={data.total_pages <= 5 ? data.total_pages : 5}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              onPageChange={handleSearch}
            />
          </div>
        </section>
      )}
    </div>
  );
}
