'use client'

import { ImHome3 } from 'react-icons/im';
import Link from 'next/link';
const items = [
  {
    'name': 'Home',
    'href': '/',
    'icon': <ImHome3 />
  }
];

export default function Navigation() {
  return (
    <div className="navigation">
      <div className="navigation-body">
        {items.map((item, i) => (
          <Link href={item.href} className="navigation-item" key={`navogation-${i}`}>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
