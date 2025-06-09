import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DetailsMidSection = () => {
  //   const posterUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}${movie.poster_path}`;
  return (
    <div className="flex sm:px-5 gap-5 mx-auto lg:w-[1100px] md:w-[800px] ">
      <div className="w-1080px mx-auto">
        <img
          //   src={posterUrl}
          alt=""
          className="w-[100px] h-[148px]  md:hidden"
        />
      </div>
      <div className="mx-auto  pb-10 lg:w-[1100px] md:w-[800px]">
        <div className="pb-5 w-[301px] md:w-[800px]">
          {/* {movie.genres?.map((genre: number) => (
            <Link href={`/genre/${genre.id}`} key={genre.id}>
              <Button variant="outline" className="rounded-full sm:mx-2 mx-1">
                {genre.name}
              </Button>
            </Link>
          ))} */}
        </div>
        <div className="w-[301px] h-full lg:w-[1100px] md:w-[800px] sm:mx-10 md:mx-2">
          {/* <p className="">{movie.overview}</p> */} dasdasda
        </div>
      </div>
    </div>
  );
};
