import React from 'react';

export default function LoadingCard() {
  return (
    <article className="flex w-32 h-52 md:w-44 lg:h-64 mb-8 z-10">
      <div className="w-full h-full">
        <div className="flex flex-col relative h-full mb-2 bg-[#8988885c] rounded-md"></div>
        <p className="w-30 md:w-40 bg-gray p-2"></p>
      </div>
    </article>
  )
}
