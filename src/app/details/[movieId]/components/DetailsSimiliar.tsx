"use client";
import { MovieCard } from "@/components/MovieCard";
import { getSimiliar } from "@/lib/api/getSimiliar";
import { MovieType } from "@/types";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const DetailsSimiliar = ({ movieId }: { movieId: string }) => {
  const [similiar, setSimiliar] = useState<MovieType[]>([]);

  useEffect(() => {
    const getSame = async () => {
      const data = await getSimiliar(movieId);
      console.log("ssss", data);
      setSimiliar(data?.results);
    };
    getSame();
  }, [movieId]);

  return (
    <div className="mx-auto max-w-[1080px] py-5">
      <div className="flex py-5 px-4 justify-between">
        <p className="font-extrabold text-[24px]">More like this</p>
        <Link href={`/category/CatSimiliar`}>
          <p className="flex gap-3 text-gray-500 hover:text-blue-700 transition-colors duration:200 cursor-pointer ">
            See More <MoveRight className="w-4" />
          </p>
        </Link>
      </div>
      <div className="md:grid md:grid-cols-3  lg:grid lg:grid-cols-5 hidden grid-cols-2 ">
        {similiar?.slice(0, 5).map((movie) => {
          return (
            <Link href={`/details/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} id={movie.id} />
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-2 md:hidden ">
        {similiar?.slice(0, 4).map((movie) => {
          return (
            <Link href={`/details/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} id={movie.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
// className="w-[150px]"
