import React, { useState, useEffect, startTransition } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import Card from '../components/Card';
export default function Categorization() {
  const location = useLocation();
  const entireUrl = location.pathname + location.search;
  const [currentCategory, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const abortController = new AbortController();

  useEffect(() => {
    startTransition(() => {
      const fetchCategory = async () => {
        const res = await fetch(`/api${entireUrl}`);
        const categoryData = await res.json();
        console.log(categoryData);
        setLoading(false);
        setCategory({...categoryData});
      }
      fetchCategory();
    });
    
    return () => {
      setLoading(true);
      abortController.abort();
    };
  }, [location.pathname, location.search]);

  const handleClick = () => {
    abortController.abort();
  };

  return (
    <section className="p-2 md:p-4">
      <div className="flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-4 w-48 p-2">{currentCategory.category ? currentCategory.category : currentCategory.genreName}</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {
            loading
            ? <Loading />
            : currentCategory.animes && currentCategory?.animes.map(item =>
              <Link to={`/anime/info?id=${item.id}`} key={item.id} onClick={handleClick} className="flex w-32 h-52 md:w-44 lg:h-64 mb-8 z-10">
                <Card showType={item.type} backgroundImg={item.poster} title={item.jname} />
              </Link>
            )
          }
        </div>
      </div>
    </section>
  )
}