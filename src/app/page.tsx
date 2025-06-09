import { MovieCarouselItem } from "@/components/MovieCarouselItem";
import { Popular } from "@/components/Popular";
import { TopRated } from "@/components/TopRated";
import { Upcoming } from "@/components/Upcoming";
import { div } from "motion/react-client";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <MovieCarouselItem />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
