"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { MovieTrailerVideo } from "@/types";
import { getMovieTrailer } from "@/lib/api/getMovieTrailer";

// import { getMovieTrailer } from "@/lib/api/getMovieTrailer";

export const MovieTrailer = ({
  movieId,
  movieTitle,
}: {
  movieId: number;
  movieTitle: string;
}) => {
  const [trailer, setTrailer] = useState<MovieTrailerVideo[]>([]);

  useEffect(() => {
    const getMovieTrailerById = async () => {
      const data = await getMovieTrailer(movieId);
      setTrailer(data?.results);
    };
    getMovieTrailerById();
  }, [movieId]);
  const movieTrailer = trailer?.find(
    (video) => video.name === "Official Trailer"
  );
  console.log(trailer);
  return (
    <div className="text-white">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black border-black cursor-pointer"
          >
            <Play /> Watch Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-fit bg-transparent border-none mx-auto">
          <div className="w-[996px] h-[561px] ">
            <DialogTitle>{movieTitle}</DialogTitle>
            <DialogDescription>Official Trailer</DialogDescription>
            <YouTube
              className="w-full h-full"
              videoId={movieTrailer?.key}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
