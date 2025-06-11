"use client";
import { Button } from "@/components/ui/button";
import { getMovieById } from "@/lib/api/getMovieById";
import { MovieType } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export const DetailsMidSection = ({ movieId }: { movieId: string }) => {
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    const showGenre = async () => {
      const data = await getMovieById(movieId);
      console.log(data);
      setMovie(data);
    };
    showGenre();
  }, [movieId]);
  if (!movie) return;
  const posterUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movie?.poster_path}`;
  return (
    <div className="flex sm:px-5 gap-5 mx-auto lg:w-[1100px] md:w-[800px] ">
      <div className="w-1080px mx-auto">
        <img
          src={posterUrl}
          alt=""
          className="w-[100px] h-[148px]  md:hidden"
        />
      </div>
      <div className="mx-auto  pb-10 lg:w-[1100px] md:w-[800px]">
        <div className="pb-5 w-[301px] md:w-[800px]">
          {movie.genres.map((genre) => (
            <Link href={`/genre/${genre.id}`} key={genre.id}>
              <Button variant="outline" className="rounded-full sm:mx-2 mx-1">
                {genre.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="w-[301px] h-full lg:w-[1100px] md:w-[800px] sm:mx-10 md:mx-2">
          <p className="">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};
