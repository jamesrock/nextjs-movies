import Link from 'next/link';
import { media_type_name, getRole } from '@/app/api';
import Poster from './Poster';

export default async function Films({
  films,
  name,
  mediaType = 'both',
  credits = false,
  type = 'films'
}) {
  // console.log(`films[${type}]`, films);
  return (
    <div className="category">
      <h2>{name}</h2>
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
