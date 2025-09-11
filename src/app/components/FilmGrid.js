'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dedupeFilms, largest_size_map, api } from '@/app/api';
import Poster from './Poster';

export default function FilmGrid({
  id,
  type = 'genre',
  name = 'name',
  sub = false
}) {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const loadMore = (target) => {
    // console.log('loadMore', target);
    api.getFilms(type, target, id).then(data => {
      setFilms(dedupeFilms([...films, ...data.results]));
      setPages(data.total_pages);
      setPage(target);
      console.log(data);
    })
    .catch(error => console.log('Error:', error));
  };
  useEffect(() => {
    console.log('useEffect');
    loadMore(1);
  }, []);
  return (
    <div className="films">
      <div className="films-head">
        <h1>{name}</h1>
        {sub && <h2>{sub}</h2>}
      </div>
      <div className="films-body">
      {films?.map((film) => (
        <Link href={`/movie/${film.id}`} className="category-item" key={film.id}>
          <Poster path={film.poster_path} size={largest_size_map.movie} />
          <div className="desc">
            <div className="desc-name">{film.title}</div>
          </div>
        </Link>
      ))}
      </div>
      {page<pages && <div className="films-foot">
        <button onClick={() => loadMore(page + 1)}>Load more</button>
      </div>}
    </div>
  );
}
