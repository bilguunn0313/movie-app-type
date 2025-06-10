"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { MovieCarouselItem } from "./MovieCarouselItem";
import { MovieType } from "@/types";
import { getNowPlaying } from "@/lib/api/getNowPlaying";

export const MovieCarousel = () => {
  const [nowMovie, setNowMovie] = useState<MovieType[]>([]);

  useEffect(() => {
    const nowPlaying = async () => {
      const data = await getNowPlaying();
      console.log("carus", data);
      setNowMovie(data?.results);
    };

    nowPlaying();
  }, []);
  return (
    <Carousel
      className="relative"
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
    >
      <CarouselContent>
        {nowMovie.slice(0, 7).map((movie, index) => {
          return (
            <CarouselItem key={index}>
              <MovieCarouselItem movieId={movie.id} movie={movie} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="invisible lg:visible left-10 to-50%" />
      <CarouselNext className="invisible lg:visible right-10 to-50%" />
    </Carousel>
  );
};
