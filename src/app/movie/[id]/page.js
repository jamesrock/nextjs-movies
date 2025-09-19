import { toTime, floorRating, getRatingClass, api } from '@/app/api';
import Poster from '@/app/components/Poster';
import CastAndCrew from '@/app/components/CastAndCrew';
import Genres from '@/app/components/Genres';
import Recommendations from '@/app/components/Recommendations';

export default async function Film({
  params
}) {
  const { id } = await params;
  const film = await api.getFilm(id);
  return (
    <main>
      <div className="film">
        <div className="film-head">
          <div className="film-head-top">
            <h1>{film.title}</h1>
            <div className="duration">{toTime(film.runtime)}</div>
            <Genres genres={film.genres} />
          </div>
          <div className="film-head-bottom">
            <div className={`rating ${getRatingClass(film.vote_average ?? 0)}`}>{floorRating(film.vote_average)}</div>
          </div>
        </div>
        <Poster path={film.poster_path} />
        <p className="plot">{film.overview}</p>
        <CastAndCrew id={film.id} />
        <Recommendations id={film.id} />
      </div>
    </main>
  );
}
