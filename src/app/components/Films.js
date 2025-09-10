import Link from 'next/link';
import { getRole } from '@/app/api';
import Poster from './Poster';

export default function Films({
  films,
  name,
  credits = false,
  genre = false
}) {
  // console.log(name, films);
  return (
    !!films.length && <div className="category">
      <div className="category-head">
        <h2>{name}</h2>
        {genre && <Link href={`/genre/${genre}`}>view all</Link>}
      </div>
      <div className="category-items">
      {films.map((film) => (
        <Link href={`/movie/${film.id}`} className="category-item" key={film.id}>
          <Poster path={film.poster_path} size="w780" />
          <div className="desc">
            <div className="desc-name">{film.title}</div>
            {credits && <div className="desc-role">{getRole(`${credits}/film`, film)}</div>}
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
