"use client";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { getTopRated } from "@/lib/api/getTopRated";
import Link from "next/link";
import { MovieType } from "@/types";

export const TopRated = () => {
  const [topRated, setTopRated] = useState<MovieType[]>([]);

  useEffect(() => {
    const getTopRatedMovie = async () => {
      const data = await getTopRated();
      setTopRated(data?.results);
    };
    getTopRatedMovie();
  }, []);
  return (
    <div className="mx-auto max-w-[1480px]">
      <div className="flex py-5 px-4 justify-between">
        <p className="font-extrabold text-[24px]">Top Rated</p>
        {/* <Link href={`/category/CatTopRated`}> */}
        <p className="flex gap-3 cursor-pointer">
          See More <MoveRight className="w-4 " />
        </p>
        {/* </Link> */}
      </div>
      <div className="md:grid md:grid-cols-3 grid-cols-2 grid lg:grid lg:grid-cols-5 ">
        {topRated.slice(0, 10).map((movie, index) => {
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
