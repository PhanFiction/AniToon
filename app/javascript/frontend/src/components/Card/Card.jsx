import React from 'react';

export default function Card({ showType, backgroundImg, title }){
  return (
    <article className="w-full h-full group">
      <div className="flex flex-col relative h-full mb-2 group bg-darkBluePurple text-lime-300 hover:-translate-y-1 duration-500"
      >
        <div className="w-full h-full absolute left-0 top-0 rounded-md group-hover:bg-[#8988885c] group-hover:backdrop-blur-[6px] duration-500">
          <p className="font-bold absolute bottom-2 left-2 opacity-0 duration-300 group-hover:opacity-100">{showType}</p>
          <svg
            className="h-[1.5em] w-[1.5em] absolute top-24 md:top-28 left-[53px] md:left-[4.7em] duration-300 opacity-0 group-hover:opacity-100"
            viewBox="0 0 48 48"
            fill="none"
            height="36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#a)">
              <path
                clipRule="evenodd"
                d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z"
                fillRule="evenodd"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path d="M0 0h48v48H0z" fill="#fff" />
              </clipPath>
            </defs>
          </svg>
          <svg className="absolute top-2 right-2 opacity-0 duration-300 group-hover:opacity-100" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
        </div>
        <img src={backgroundImg} alt={backgroundImg} className="w-full h-full object-cover rounded-md" />
      </div>
      <p className="group-hover:text-red text-xs md:text-base font-medium duration-500 w-30 md:w-40 truncate">{title}</p>
    </article>
  );
};