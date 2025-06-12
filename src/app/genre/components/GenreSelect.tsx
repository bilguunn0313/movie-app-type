"use client";

import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { getFilterGenre } from "@/lib/api/getFilterGenre";
import { getGenre } from "@/lib/api/getGenre";
import { MovieType } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState, useTransition } from "react";
import { start } from "repl";

type Results = {
  total_results: number;
  total_pages: number;
  results: MovieType[];
  page: number;
};

export const GenreSelect = () => {
  const router = useRouter();
  const search = useSearchParams();
  const genreId = search.get("genreId");

  const [showGenre, setShowGenre] = useState<MovieType[]>([]);
  const [selectGenreId, setSelectGenreId] = useState<{
    ids: number[];
    names: string[];
  }>({
    ids: [],
    names: [],
  });
  const [filterGenre, setFilterGenre] = useState<Results>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getGenre();
      setShowGenre(data?.genres);
    };
    fetchGenre();
  }, []);

  useEffect(() => {
    const fetchFilterGenre = async () => {
      const data = await getFilterGenre(
        selectGenreId.ids.join(","),
        Number(genreId)
      );
      console.log("dsadas", data);
      setFilterGenre(data);
    };
    fetchFilterGenre();
  }, [selectGenreId, genreId]);

  const toggleGenre = (id: number, name: string) => {
    const updateGenres = () => {
      const getSelected = selectGenreId.ids.includes(id);

      const newIds = getSelected
        ? selectGenreId.ids.filter((genreId) => genreId !== id)
        : [...selectGenreId.ids, id];

      const newNames = getSelected
        ? selectGenreId.names.filter((genreName) => genreName !== name)
        : [...selectGenreId.names, name];

      return {
        ids: newIds,
        names: newNames,
      };
    };
    const { ids, names } = updateGenres();
    setSelectGenreId({ ids, names });

    const params = new URLSearchParams();
    params.set("genreID", ids.join(","));
    params.set("name", names.join(","));

    startTransition(() => {
      router.push(`/genre?genreId=${ids.join(",")}&name=${names.join(", ")}`);
    });
  };

  return (
    <div className="sm:flex">
      <div className="sm:ml-40">
        <div className="px-5">
          <h1 className="font-[600] sm:text-[30px] text-[24px] mb-8 sm:mt-[52px] mt-[32px] sm:px-2 ">
            Search filter
          </h1>
          <div className="mb-5 sm:px-2 ">
            <h2 className="font-[600] sm:text-[24px] text-[20px] ">Genres</h2>
            <p className="font-[400] text-[16px] ">
              See lists of movies by genre
            </p>
          </div>
        </div>
        <div>
          <div className=" sm:w-[500px] ml-3  flex-wrap flex sm:gap-2 gap-2 ">
            {showGenre?.map((genre) => (
              <div className="sm:py-2 py-1" key={genre.id}>
                <Button
                  variant={"outline"}
                  className={`flex rounded-full sm:mx-2 text-[12px] font-[600] cursor-pointer hover:bg-gray-300 w-full h-5 sm:h-8 ${
                    selectGenreId.ids.includes(genre.id)
                      ? "bg-[#18181b] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => toggleGenre(genre.id, genre.name)}
                >
                  {genre.name}
                  <ChevronRight />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:border-1 sm:max-h-full sm:mt-32 sm:mx-5"></div>
      <div className="">
        <div className="sm:mt-[130px] mt-8 ">
          <h1 className="font-[600] text-[20px] flex mx-5">
            <p> {filterGenre?.total_results} titles in</p>
            <p> "{selectGenreId.names.join(", ")}"</p>
          </h1>
          <div className="md:grid md:grid-cols-3 sm:grid-cols-2 sm:grid lg:grid lg:grid-cols-5 grid grid-cols-2 ">
            {filterGenre?.results?.map((movie) => {
              return (
                <Link href={`/details/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} id={movie.id} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
