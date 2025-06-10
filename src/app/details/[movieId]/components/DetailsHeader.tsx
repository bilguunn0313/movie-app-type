"use client";
import { MovieTrailer } from "@/components/MovieTrailer";
import { getMovieById } from "@/lib/api/getMovieById";
import { MovieType } from "@/types";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type MovieProps = {
  movieIds: MovieType;
};

export const DetailsHeader = ({ movieIds }: { movieIds: string }) => {
  const [deMovie, setDeMovie] = useState<MovieProps[]>([]);
  // const imgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movieIds?.poster_path}`;
  // const bgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movieIds?.backdrop_path}`;

  useEffect(() => {
    const getMovie = async () => {
      const data = await getMovieById(movieIds);
      setDeMovie(data?.results);
    };
    getMovie();
  }, [movieIds]);

  return (
    <div className="mx-auto lg:w-[1080px] md:w-[768px] sm:w-[640px] ">
      <div className="pt-8 pb-4 justify-between flex px-5  ">
        <div>
          <h1 className="sm:text-[24px] text-[20px] font-[600]">
            {/* {movieIds?.title} */}
          </h1>
          <div className="flex">
            {/* <p>{movie?.release_date} ·</p> */}
            <p>PG ·</p>
            <p>
              {/* {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60} */}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex">
            <Star
              color="rgba(253, 224, 71, 1)"
              fill="rgba(253, 224, 71, 1)"
              className="w-4"
            />

            <div className="flex">
              {/* <p className="font-[600]">{movie?.vote_average?.toFixed(1)}</p> */}
              <p className="text-[#71717a]">/10</p>
            </div>
          </div>
          {/* <p className="text-[#71717a]">{movie?.vote_count}</p> */}
        </div>
      </div>
      <div>
        <div className="flex gap-8 pb-8 pt-6">
          <img
            // src={imgUrl}
            className="w-[100px] h-[148px] lg:w-[290px] lg:h-[428px] hidden lg:flex rounded-2xl"
          />
          <div className="flex relative w-full h-full bg-black">
            <img
              //   src={bgUrl}
              alt=""
              className="lg:w-[762px] lg:h-[428px] rounded-2xl relative opacity-90 "
            />
            <div className=" flex absolute md:top-87 sm:p-[20px] top-35   ">
              {/* <MovieTrailer movieId={movie.id} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
