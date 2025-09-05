import Link from 'next/link'
import {base, toTime, getRatingClass} from '@/app/api';

export default async function Film({
  params
}) {
  const { id } = await params;
  const data = await fetch(base + '/titles/' + id);
  const film = await data.json();
  console.log(film);
  return (
    <main>
      <div className="film" key={film.id}>
        <div className="film-head">
          <div className="film-head-top">
            <h1>{film.primaryTitle}</h1>
            <div className="duration">{toTime(film?.runtimeSeconds)}</div>
            <div className="genres">{film?.genres.map((genre) => genre).join(' / ')}</div>
          </div>
          <div className="film-head-bottom">
            <div className={`rating ${getRatingClass(film?.rating?.aggregateRating ?? 0)}`}>{film?.rating?.aggregateRating ?? '-'}</div>
          </div>
        </div>
        <img className="poster" src={film?.primaryImage?.url} />
        <p className="plot">{film?.plot}</p>
        <div className="film-details">
          <div className="directors">Director(s): {film?.directors.map((director) => (<Link key={director.id} href={`/director/${director.id}`}>{director.displayName}</Link>))}</div>
          <div className="stars">Starring: {film?.stars.map((star) => (<Link key={star.id} href={`/actor/${star.id}`}>{star.displayName}</Link>))}</div>
        </div>
        
      </div>
    </main>
  );
}
