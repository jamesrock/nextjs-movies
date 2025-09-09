'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetch_options, tmdb_base, genres } from '@/app/api';
import Poster from './Poster';

export default function FilmGrid({
  id
}) {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(0);
  const loadMore = (target) => {
    console.log('loadMore', target);
    fetch(tmdb_base + `/discover/movie?page=${target}&region=GB&sort_by=popularity.desc&with_release_type=2%7C3&with_genres=${id}`, fetch_options)
      .then(response => response.json())
      .then(data => {setFilms([...films, ...data.results]);setPage(target);console.log(data);})
      .catch(error => console.log('Error:', error));
  };
  useEffect(() => {
    console.log('useEffect');
    loadMore(1);
  }, []);
  return (
    <div className="films">
      <div className="films-head">
        <h1>{genres[id]}</h1>
      </div>
      <div className="films-body">
      {films?.map((film) => (
        <Link href={`/movie/${film.id}`} className="category-item" key={film.id}>
          <Poster path={film.poster_path} />
          <div className="desc">
            <div className="desc-name">{film.title}</div>
          </div>
        </Link>
      ))}
      </div>
      <div className="films-foot">
        <button onClick={() => loadMore(page + 1)}>Load more</button>
      </div>
    </div>
  );
}
