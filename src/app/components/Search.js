'use client'

import Link from 'next/link'
import { useState } from 'react';
import { fetch_options, tmdb_base, tmdb_media_base, media_type_name, media_type_profile_path } from '@/app/api';

export default function Search() {
  const [list, setList] = useState([]);
  const runSearch = (query) => {
    if(query.length === 0) {
      setList([]);
      return;
    };
    fetch(tmdb_base + `/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, fetch_options)
      .then(response => response.json())
      .then(data => {setList(data.results); console.log(data.results)})
      .catch(error => console.log('Error:', error));
  };
  return (
    <div className="search">
      <input type="search" placeholder="Search film, actor, director" onChange={(e) => runSearch(e.target.value)} />
      <div className="search-results">
        {list.map((item) => (
          <Link href={`/${item.media_type}/${item.id}`} className="search-results-item" key={item.id}>
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
  );
}
