import { MovieCarousel } from "@/components/MovieCarousel";
import { Popular } from "@/components/Popular";
import { TopRated } from "@/components/TopRated";
import { Upcoming } from "@/components/Upcoming";

export default function Home() {
  return (
    <div>
      <MovieCarousel />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}
