import Link from 'next/link'
import { tmdb_media_base } from '@/app/api';

export default async function Films({
  films,
  name,
  type
}) {
  return (
    <div className="filmography">
      <h2>{name}</h2>
      <div className="filmography-items">
      {films.map((film, i) => (
        <Link href={`/movie/${film.id}`} className="filmography-item" key={`${type}-${film.id}-${i}`}>
          <div className="poster-crop">
            <img className="poster" src={film.poster_path ? (tmdb_media_base + film.poster_path) : null } />
          </div>
          <div className="desc">
            <div className="desc-title">{film.title}</div>
            <div className="desc-role">{type==='cast' ? film.character : film.job}</div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
