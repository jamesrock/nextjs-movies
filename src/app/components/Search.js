'use client'

import Link from 'next/link';
import { useState } from 'react';
import { media_type_name, media_type_profile_path, largest_size_map, addProp, sortByProp, filterByMatch, api } from '@/app/api';
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
      setList(cache[q]);
      return;
    };
    api.search(q).then(data => {
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
                <Poster path={item[media_type_profile_path[item.media_type]]} size={largest_size_map[item.media_type]} />
              </div>
              <div>{item[media_type_name[item.media_type]]}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
