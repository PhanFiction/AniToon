import React from 'react';
import { BsFillPlayCircleFill } from "react-icons/bs";


export default function AnimeCard ({ showType="", backgroundImg="", title="" }) {
  return (
    <article className="w-full h-full group">
      <div className="flex flex-col relative h-full mb-2 group bg-darkBluePurple text-lime-300">
        <div className="w-full h-full absolute left-0 top-0 rounded-md group-hover:bg-[#8988885c] group-hover:backdrop-blur-[6px] duration-500">
          <p className="font-bold absolute bottom-2 left-2 opacity-0 duration-300 group-hover:opacity-100">{showType}</p>
          {/* Center Icon */}
          <BsFillPlayCircleFill className="h-[1.5em] w-[1.5em] absolute top-24 md:top-28 left-[53px] md:left-[4.7em] duration-300 opacity-0 group-hover:opacity-100 text-white"/>
        </div>
        <img src={backgroundImg} alt={backgroundImg} className="w-full h-full object-cover rounded-md" />
      </div>
      <p className="group-hover:text-red text-xs md:text-base font-medium duration-500 w-30 md:w-40 truncate">{title}</p>
    </article>
  );
};