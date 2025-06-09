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

// import { getMovieTrailer } from "@/lib/api/getMovieTrailer";

export const MovieTrailer = () => {
  const [trailer, setTrailer] = useState([]);

  //   useEffect(() => {
  //     const getMovieTrailerById = async () => {
  //       const data = await getMovieTrailer();
  //       setTrailer(data?.results);
  //     };
  //     getMovieTrailerById();
  //   }, []);

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
            <DialogTitle>Trailer</DialogTitle>
            <DialogDescription>
              Энэ бол тайлбар юм. Диалог юу хийхийг хэрэглэгчид ойлгуулахад
              тусална.
            </DialogDescription>
            <YouTube
              className="w-full h-full"
              // videoId={movieTrailer?.key}
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
