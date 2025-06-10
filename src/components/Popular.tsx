"use client";
import { MoveRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import { getPopular } from "@/lib/api/getPopular";
import { MovieType } from "@/types";
import Link from "next/link";

export const Popular = () => {
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const getPopulars = async () => {
      const data = await getPopular();
      setPopularMovies(data?.results);
    };
    getPopulars();
  }, []);

  return (
    <div className="mx-auto max-w-[1480px] ">
      <div className="flex py-5 px-4 justify-between">
        <p className="font-extrabold text-[24px]">Popular</p>
        {/* <Link href={`/category/CatPopular`}> */}
        <p className="flex gap-3 cursor-pointer  text-gray-500 hover:text-blue-700 transition-colors duration-200">
          See More <MoveRight className="w-4 " />
        </p>
        {/* </Link> */}
      </div>
      <div className="md:grid md:grid-cols-3 grid grid-cols-2 sm:grid lg:grid lg:grid-cols-5  ">
        {popularMovies.slice(0, 10).map((movie, index) => {
          return (
            <Link href={`/details/${movie.id}`} key={movie.id}>
              <MovieCard id={index} movie={movie} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
