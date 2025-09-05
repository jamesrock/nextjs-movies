import Link from 'next/link'
import {base, toTime, getRatingClass} from '@/app/api';

export default async function Film({
  params
}) {
  const { id } = await params;
  const data = await fetch(base + '/titles/' + id);
  const film = await data.json();
  return (
    <main>
      <div className="film" key={film.id}>
        <h1>{film.primaryTitle}</h1>
        <img className="poster" src={film?.primaryImage?.url} />
        <p className="plot">{film?.plot}</p>
        <div className="genres">{film?.genres.map((genre) => genre).join(' / ')}</div>
        <div className="directors">Director(s): {film?.directors.map((director) => (<Link key={director.id} href={`/director/${director.id}`}>{director.displayName}</Link>))}</div>
        <div className="stars">Starring: {film?.stars.map((star) => (<Link key={star.id} href={`/actor/${star.id}`}>{star.displayName}</Link>))}</div>
        <div className="duration">Duration: {toTime(film?.runtimeSeconds)}</div>
        <div className={`rating ${getRatingClass(film?.rating?.aggregateRating ?? 0)}`}>{film?.rating?.aggregateRating ?? '-'}</div>
      </div>
    </main>
  );
}
