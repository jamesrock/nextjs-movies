'use client'

import Link from 'next/link'
import { useState } from 'react';
import { base } from '@/app/api';

export default function Search() {
  // const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const runSearch = (query) => {
    if(query.length === 0) {
      setList([]);
      return;
    };
    fetch(base + '/search/titles?query=' + query)
      .then(response => response.json())
      .then(data => setList(data.titles.filter((title) => title.type==='movie')))
      .catch(error => console.log('Error:', error));
  };
  return (
    <div className="search">
      <input type="search" placeholder="Search film, actor, director" onChange={(e) => runSearch(e.target.value)} />
      <div className="search-results">
        {list.map((title) => (
          <Link href={`/film/${title.id}`} className="search-results-item" key={title.id}>
            <img className="poster" src={title?.primaryImage?.url} />
            <div>{title.primaryTitle}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
