import React from "react";
import { DetailsHeader } from "./components/DetailsHeader";
import { DetailsMidSection } from "./components/DetailsMidSection";

const Page = async ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = await params;

  return (
    <div>
      <DetailsHeader movieIds={movieId} />
      <DetailsMidSection />
    </div>
  );
};

export default Page;
