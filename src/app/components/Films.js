import Link from 'next/link';
import { media_type_name, getRole } from '@/app/api';
import Poster from './Poster';

export default async function Films({
  films,
  name,
  mediaType = 'both',
  credits = false,
  genre = false,
  type = 'films',
}) {
  // console.log(`films[${type}]`, films);
  return (
    !!films.length && <div className="category">
      <div className="category-head">
        <h2>{name}</h2>
        {genre && <Link href={`/genre/${genre}`}>view all</Link>}
      </div>
      <div className="category-items">
      {films.map((film) => (
        <Link href={`/${mediaType==='both' ? film.media_type : mediaType}/${film.id}`} className="category-item" key={`${type}-${film.id}`}>
          <Poster path={film.poster_path} />
          <div className="desc">
            <div className="desc-name">{film[media_type_name[mediaType==='both' ? film.media_type : mediaType]]}</div>
            {credits && <div className="desc-role">{getRole(`${credits}/${(mediaType==='both' ? film.media_type : mediaType)}`, film)}</div>}
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
