'use client'

import Link from 'next/link';
import { useState } from 'react';
import { fetch_options, tmdb_base, tmdb_media_base, media_type_name, media_type_profile_path, addProp, sortByProp, filterByMatch } from '@/app/api';
import Poster from './Poster';
const cache = {};

export default function Search() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const runSearch = (q) => {
    setQuery(q);
    if(q.length === 0) {
      clearSearch();
      return;
    };
    if(cache[q]) {
      return setList(cache[q]);
    };
    Promise.all([
      fetch(tmdb_base + `/search/movie?query=${q}`, fetch_options), 
      fetch(tmdb_base + `/search/person?query=${q}`, fetch_options)
    ]).then(responses => {
      return Promise.all(responses.map((response) => response.json()));
    }).then(data => {
      cache[q] = sortByProp(filterByMatch([...addProp(data[0].results, 'media_type', 'movie'), ...addProp(data[1].results, 'media_type', 'person')], q), 'popularity');
      setList(cache[q]);
      console.log('combined', cache[q]);
    }).catch(error => console.log('Error:', error));
  };
  const clearSearch = () => {
    setQuery('');
    setList([]);
  };
  return (
    <div className="search">
      <div className="search-body">
        <input type="search" placeholder="Search film, actor, director" value={query} onChange={(e) => runSearch(e.target.value)} />
        <div className="search-results">
          {list.map((item) => (
            <Link href={`/${item.media_type}/${item.id}`} className="search-results-item" key={item.id} onClick={clearSearch}>
              <div className="poster-wrap">
                <Poster src={item[media_type_profile_path[item.media_type]]} />
              </div>
              <div>{item[media_type_name[item.media_type]]}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
