import Link from 'next/link'
import { tmdb_media_base, media_type_name, getFilmographyRole } from '@/app/api';

export default async function Films({
  films,
  name,
  type = 'listing',
  mediaType = 'both',
  credits = false
}) {
  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="category-items">
      {films.map((film, i) => (
        <Link href={`/${mediaType==='both' ? film.media_type : mediaType}/${film.id}`} className="category-item" key={`${type}-${film.id}-${i}`}>
          <div className="poster-crop">
            <img className="poster" src={film.poster_path ? (tmdb_media_base + film.poster_path) : null } />
          </div>
          <div className="desc">
            <div className="desc-name">{film[media_type_name[mediaType==='both' ? film.media_type : mediaType]]}</div>
            {credits && <div className="desc-role">{getFilmographyRole(type, film)}</div>}
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
