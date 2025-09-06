import Link from 'next/link'
import { tmdb_media_base, media_type_name, getRole } from '@/app/api';

export default async function Films({
  films,
  name,
  type
}) {
  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="category-items">
      {films.map((film, i) => (
        <Link href={`/${film.media_type}/${film.id}`} className="category-item" key={`${type}-${film.id}-${i}`}>
          <div className="poster-crop">
            <img className="poster" src={film.poster_path ? (tmdb_media_base + film.poster_path) : null } />
          </div>
          <div className="desc">
            <div className="desc-name">{film[media_type_name[film.media_type]]}</div>
            <div className="desc-role">{getRole(type, 'movie', film)}</div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
