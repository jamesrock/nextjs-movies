'use client'

import Link from 'next/link';
import { useState } from 'react';
import { fetch_options, tmdb_base, tmdb_media_base, media_type_name, media_type_profile_path, filterSearch } from '@/app/api';
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
    fetch(tmdb_base + `/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, fetch_options)
      .then(response => response.json())
      .then(data => {cache[q] = filterSearch(data.results); setList(cache[q]);})
      .catch(error => console.log('Error:', error));
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
                <div className="poster-crop">
                  <img className="poster" src={item[media_type_profile_path[item.media_type]] ? (tmdb_media_base + item[media_type_profile_path[item.media_type]]) : null} />
                </div>
              </div>
              <div>{item[media_type_name[item.media_type]]}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
