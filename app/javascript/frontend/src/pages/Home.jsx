import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import AnimeItem from "../components/Card/AnimeItem";
import useFetchUser from "../hooks/useFetchUser";
import LoadingCard from "../components/Loading/LoadingCard";

function Home() {
  const [homeData, setHomeData] = useState({
    trendingAnimes: [],
    latestCompletedAnimes: [],
    top10Animes: { week: [] },
    mostFavoriteAnimes: [],
    mostPopularAnimes: [],
    latestEpisodeAnimes: [],
    topUpcomingAnimes: [],
  });
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);
  const { user } = useFetchUser();
  
  useEffect(() => {
    const fetchHomeData = async () => {
      const res = await fetch('/api/anime');
      const homeData = await res.json();
      setHomeData(homeData.data);
      setLoading(false);
      if (homeData.watch_list?.length > 0) setWatchList(homeData.watch_list);
    }
    fetchHomeData();

    return () => {
      setLoading(true);
    }
  }, []);

  function fakeLoadCards() {
    return (
      Array.from({length: 5}).map((_, i) => (
        <LoadingCard key={i} />
      ))
    )
  }

  return (
    <section className="">
      <div>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={true}
        >
          {
            loading ? <p>Loading</p> :
            homeData.spotlightAnimes.map(item => 
              <SwiperSlide key={item.id}>
                <div className="w-full h-full relative hover:cursor-pointer">
                  <div className="flex flex-col gap-4 w-full lg:w-1/2 absolute bottom-0 bg-darkBluePurple p-4 opacity-90">
                    <h1 className="text-md md:text-2xl font-bold">{item.name}</h1>
                    <p className="hidden md:block md:w-4/5 h-30 text-sm overflow-hidden my-4">{item.description.slice(0, 425)}...</p>
                    <div className="flex gap-4">
                      <Link to={`/anime/watch/${item.id}`} className="border solid p-2 rounded-md">
                        Watch Now
                      </Link>
                      <Link to={`/anime/info?id=${item.id}`} className="border solid p-2 rounded-md">
                        Details
                      </Link>
                    </div>
                  </div>
                  <img src={item.poster} alt="poster" className="w-full h-64 object-cover md:h-[500px] md:object-left-top" />
                </div>
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>

      <article className="pl-2 md:pl-8 mt-8">
        <h1 className="text-2xl font-bold ml-4 md:ml-0 mb-4 w-48">
          Trending
        </h1>
        <Swiper
          pagination={true}
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {
            homeData.trendingAnimes.map(item =>
              <SwiperSlide key={item.id}>
                <div className="w-full h-full relative hover:cursor-pointer">
                  <div className="flex flex-col gap-4 w-full absolute bottom-0 bg-darkBluePurple p-4 opacity-90">
                    <h1 className="text-md md:text-lg font-bold">{item.name}</h1>
                    <div className="flex gap-4">
                      <Link to={`/anime/watch/${item.id}`} className="border solid p-2 rounded-md">
                        Watch Now
                      </Link>
                      <Link to={`/anime/info?id=${item.id}`} className="border solid p-2 rounded-md">
                        Details
                      </Link>
                    </div>
                  </div>
                  <img src={item.poster} alt="poster" className="w-full h-64 object-cover md:h-[500px] md:object-left-top" />
                </div>
              </SwiperSlide>
            )
          }
        </Swiper>
      </article>

      <div class="flex flex-wrap justify-evenly">
        <article className="pl-2 md:pl-8 mt-8">
          <h1 className="text-lg md:text-2xl font-bold ml-4 md:ml-0 mb-4">
            Top Airing
          </h1>
          <div className="flex flex-col flex-wrap justify-center md:justify-start gap-4 mb-2">
            {
              loading ? fakeLoadCards() :
              homeData.top10Animes.week.slice(0,5).map(item =>
                <AnimeItem item={item} key={item.id} bookmarked={watchList} user={user} />
              )
            }
          </div>
          <Link to="/anime/category/top-airing?page=1" className="text-gray text-xs font-bold ml-5 md:ml-0">
            View More &gt;
          </Link>
        </article>

        <article className="pl-2 md:pl-8 mt-8">
          <h1 className="text-lg md:text-2xl font-bold ml-4 md:ml-0 mb-4">
            Completed
          </h1>
          <div className="flex flex-col flex-wrap justify-center md:justify-start gap-4 mb-2">
            {
              loading ? fakeLoadCards() :
              homeData.latestCompletedAnimes.map(item =>
                <AnimeItem item={item} key={item.id} bookmarked={watchList} user={user} />
              )
            }
          </div>
          <Link to="/anime/category/completed?page=1" className="text-gray text-xs font-bold ml-5 md:ml-0">
            View More &gt;
          </Link>
        </article>

        <article className="pl-2 md:pl-8 mt-8">
          <h1 className="text-lg md:text-2xl font-bold ml-4 md:ml-0 mb-4">
            Most Favorite
          </h1>
          <div className="flex flex-col flex-wrap justify-center md:justify-start gap-4 mb-2">
            {
              loading ? fakeLoadCards() :
              homeData.mostFavoriteAnimes.map(item =>
                <AnimeItem item={item} key={item.id} bookmarked={watchList} user={user} />
              )
            }
          </div>
          <Link to="/anime/category/most-favorite?page=1" className="text-gray text-xs font-bold ml-5 md:ml-0">
            View More &gt;
          </Link>
        </article>

        <article className="pl-2 md:pl-8 mt-8">
          <h1 className="text-lg md:text-2xl font-bold ml-4 md:ml-0 mb-4">
            Most Popular
          </h1>
          <div className="flex flex-col flex-wrap justify-center md:justify-start gap-4 mb-2">
            {
              loading ? fakeLoadCards() :
              homeData.mostPopularAnimes.map(item =>
                <AnimeItem item={item} key={item.id} bookmarked={watchList} user={user} />
              )
            }
          </div>
          <Link to="/anime/category/completed?page=1" className="text-gray text-xs font-bold ml-5 md:ml-0">
            View More &gt;
          </Link>
        </article>
      </div>

      <article className="pl-2 md:pl-8 mt-8">
        <h1 className="text-2xl font-bold ml-4 md:ml-0 mb-4 w-48">
          Latest Episodes
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-2">
          {
            loading ? fakeLoadCards() :
            homeData.latestEpisodeAnimes.map(item =>
              <AnimeItem item={item} key={item.id} bookmarked={watchList} user={user} />
            )
          }
        </div>
        <Link to="/anime/category/recently-updated?page=1" className="text-gray text-xs font-bold ml-5 md:ml-0">
          View More &gt;
        </Link>
      </article>

      <article className="pl-2 md:pl-8 mt-8">
        <h1 className="text-2xl font-bold ml-4 md:ml-0 mb-4 w-48">
          Top Upcoming
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-2">
          {
            loading ? fakeLoadCards() :
            homeData.topUpcomingAnimes.map(item =>
              <AnimeItem item={item} key={item.id} bookmarked={watchList} user={user} />
            )
          }
        </div>
        <Link to="/anime/category/top-upcoming?page=1" className="text-gray text-xs font-bold mt-12 ml-5 md:ml-0">
          View More &gt;
        </Link>
      </article>
    </section>
  )
}

export default Home;