"use client";
import { MovieCasts, MovieCrew } from "@/types";
import { useEffect, useState } from "react";

export const DetailsDirector = ({ movieId }: { movieId: string }) => {
  const [directors, setDirectors] = useState<MovieCrew[]>([]);
  const [writers, setWriters] = useState<MovieCrew[]>([]);
  const [casts, setCasts] = useState<MovieCasts[]>([]);
  useEffect(() => {
    const getDirectors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}movie/${movieId}/credits?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        const directorList = data?.crew?.filter(
          (person: MovieCrew) => person.job === "Director"
        );
        setDirectors(directorList);
        const writerList = data?.crew?.filter(
          (person: MovieCrew) => person.department === "Writing"
        );
        setWriters(writerList);

        setCasts(data?.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getDirectors();
  }, [movieId]);
  if (!movieId) return;
  return (
    <div className="">
      <div className="flex md:gap-12 px-5 mx-auto lg:w-[1100px] md:w-[800px] ">
        <h1 className="font-[600]">Director:</h1>
        {directors.map((director) => (
          <p key={director.id} className="pl-4">
            "{director.name}"
          </p>
        ))}
      </div>
      <div className="border-1 my-5 md:max-w-[1080px] mx-auto sm:max-w-[380px]"></div>

      <div className="flex md:gap-15   mx-auto lg:w-[1100px] md:w-[800px]">
        <h1 className="font-[600] pl-5">Writer:</h1>
        {writers.slice(0, 3).map((writer) => (
          <p key={writer.id} className="flex pl-5">
            "{writer.name}"
          </p>
        ))}
      </div>
      <div className="border-1 my-5 mx-auto md:max-w-[1080px] sm:max-w-[380px]"></div>

      <div className="flex md:gap-16  mx-auto lg:w-[1100px] md:w-[800px]">
        <h1 className="font-[600] pl-5">Stars:</h1>
        {casts.slice(0, 3).map((actor) => (
          <p key={actor.id} className="pl-5 flex ">
            "{actor.name}"
          </p>
        ))}
      </div>
      <div className="border-1 my-5 mx-auto md:max-w-[1080px] sm:min-w-[380px]"></div>
    </div>
  );
};
