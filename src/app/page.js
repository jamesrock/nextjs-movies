import Link from 'next/link'
import {base, getRatingClass} from './api';

export default async function Home() {
  const data = await fetch(base + '/titles?types=MOVIE');
  const films = await data.json();
  return (
    <main>
      <h1>Latest Releases</h1>
      <div className="films">
      {films?.titles.length && films.titles.map((film) => (
        <Link href={`/film/${film.id}`} className="film" key={film.id}>
          <img className="poster" src={film.primaryImage.url} />
          <div>
            <h3>{film.primaryTitle}</h3>
            <div className="genres">{film.genres.map((genre) => genre).join(' / ')}</div>
            <div className={`rating ${getRatingClass(film?.rating?.aggregateRating ?? 0)}`}>{film?.rating?.aggregateRating ?? '-'}</div>
          </div>
        </Link>
      ))}
      </div>
    </main>
  );
}
