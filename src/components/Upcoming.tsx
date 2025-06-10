"use client";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getUpcoming } from "@/lib/api/getUpcoming";
import { MovieCard } from "./MovieCard";
import { MovieType } from "@/types/index";
import Link from "next/link";

export const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const getUpcomingMovie = async () => {
      const data = await getUpcoming();
      setUpcomingMovies(data?.results);
    };
    getUpcomingMovie();
  }, []);
  return (
    <div className="mx-auto max-w-[1480px]">
      <div className="flex sm:py-5 px-4 justify-between">
        <p className="font-extrabold text-[24px]">Upcoming</p>
        {/* <Link href={`/category/CatUpcoming`}> */}
        <p className="flex gap-3 cursor-pointer text-gray-500 hover:text-blue-700 transition-colors duration-200 ">
          See More <MoveRight className="w-4 " />
        </p>
        {/* </Link> */}
      </div>
      {/* {loading && <HomePageLoader />} */}
      <div className="md:grid md:grid-cols-3 sm:grid-cols-2 sm:grid lg:grid lg:grid-cols-5 grid grid-cols-2 ">
        {upcomingMovies.slice(0, 10).map((movie, index) => {
          return (
            <Link href={`/details/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} id={index} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
