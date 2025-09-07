'use client'

import Link from 'next/link';
import { useState } from 'react';
const items = [
  {
    'name': 'Home',
    'href': '/'
  }
];

export default function Navigation() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  return (
    <div className="navigation">
      <div className="navigation-body">
        {items.map((item, i) => (
          <Link href={item.href} className="navigation-item" key={`navogation-${i}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
