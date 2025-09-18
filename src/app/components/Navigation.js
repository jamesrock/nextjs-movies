'use client'

import Link from 'next/link';
const items = [
  {
    'name': 'Home',
    'href': '/',
    'icon': <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" d="m16 9.226l-8-6.21l-8 6.21V6.694l8-6.21l8 6.21zM14 9v6h-4v-4H6v4H2V9l6-4.5z"/></svg>
  }
];

export default function Navigation() {
  return (
    <div className="navigation">
      <div className="navigation-body">
        {items.map((item, i) => (
          <Link href={item.href} aria-label={item.name} className="navigation-item" key={`navogation-${i}`}>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
