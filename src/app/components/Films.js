import Link from 'next/link';
import { getRole, largest_size_map } from '@/app/api';
import Poster from './Poster';

export default function Films({
  films,
  name,
  credits = false,
  link = false
}) {
  return (
    !!films.length && <div className="category">
      <div className="category-head">
        <h2>{name}</h2>
        {link && <Link href={link}>view all</Link>}
      </div>
      <div className="category-items">
      {films.map((film) => (
        <Link href={`/movie/${film.id}`} className="category-item" key={film.id}>
          <Poster path={film.poster_path} size={largest_size_map.movie} />
          <div className="desc">
            <div className="desc-name">{film.title}</div>
            {credits && <div className="desc-role">{getRole(credits, film)}</div>}
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
