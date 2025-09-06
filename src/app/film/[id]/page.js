import Link from 'next/link'
import { toTime, getRatingClass } from '@/app/api';
import { fetch_options, tmdb_base, tmdb_media_base } from '@/app/api';
import CastAndCrew from '@/app/components/CastAndCrew';

export default async function Film({
  params
}) {
  const { id } = await params;
  const data = await fetch(tmdb_base + `/movie/${id}?language=en-US`, fetch_options);
  const film = await data.json();
  console.log(film);
  return (
    <main>
      <div className="film">
        <div className="film-head">
          <div className="film-head-top">
            <h1>{film?.title}</h1>
            <div className="duration">{toTime(film?.runtime)}</div>
            <div className="genres">{film?.genres.map((genre) => genre.name).join(' / ')}</div>
          </div>
          <div className="film-head-bottom">
            <div className={`rating ${getRatingClass(film?.vote_average ?? 0)}`}>{film?.vote_average ?? '-'}</div>
          </div>
        </div>
        <img className="poster" src={tmdb_media_base + film?.poster_path} />
        <p className="plot">{film?.overview}</p>
        <CastAndCrew id={film?.id} name="Cast" type="cast" />
      </div>
    </main>
  );
}
