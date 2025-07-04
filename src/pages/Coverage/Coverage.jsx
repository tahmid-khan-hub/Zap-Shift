import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenter = useLoaderData();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4 text-center">
        We deliver all over Bangladesh
      </h1>
      <BangladeshMap serviceCenter={serviceCenter}/>
    </div>
  );
};

export default Coverage;
