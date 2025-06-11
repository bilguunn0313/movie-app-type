import React from "react";
import { DetailsHeader } from "./components/DetailsHeader";
import { DetailsMidSection } from "./components/DetailsMidSection";
import { DetailsDirector } from "./components/DetailsDirector";
import { DetailsSimiliar } from "./components/DetailsSimiliar";

const Page = async ({ params }: { params: { movieId: string } }) => {
  const movieId = await params.movieId;

  return (
    <div>
      <DetailsHeader movieId={movieId} />
      <DetailsMidSection movieId={movieId} />
      <DetailsDirector movieId={movieId} />
      <DetailsSimiliar movieId={movieId} />
    </div>
  );
};

export default Page;
