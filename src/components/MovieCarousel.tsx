import { useEffect, useState } from "react";
import { getNowPlaying } from "@/lib/api/getNowPlaying";

import useEmblaCarousel from "embla-carousel-react";
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

type CarouselProps = {
  title: string;
};

export const MovieCarousel = () => {
  const [nowMovie, setNowMovie] = useState([]);

  useEffect(() => {
    const NowPlaying = async () => {
      const data = await getNowPlaying();
      setNowMovie(data?.results);
    };

    NowPlaying();
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
        {nowMovie?.slice(0, 7).map((movie: CarouselProps, index) => (
          <CarouselItem key={index}>
            <MovieCarouselItem />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="invisible lg:visible left-10 to-50%" />
      <CarouselNext className="invisible lg:visible right-10 to-50%" />
    </Carousel>
  );
};
