import { floorRating, getRatingClass, fetch_options, tmdb_base } from '@/app/api';
import CastAndCrew from '@/app/components/CastAndCrew';
import Genres from '@/app/components/Genres';
import Poster from '@/app/components/Poster';

export default async function TV({
  params
}) {
  const { id } = await params;
  const data = await fetch(tmdb_base + `/tv/${id}?language=en-US`, fetch_options);
  const film = await data.json();
  console.log(film);
  return (
    <main>
      <div className="film">
        <div className="film-head">
          <div className="film-head-top">
            <h1>{film?.name}</h1>
            <div className="duration">{film?.number_of_episodes} episodes</div>
            <Genres genres={film?.genres} />
          </div>
          <div className="film-head-bottom">
            <div className={`rating ${getRatingClass(film?.vote_average ?? 0)}`}>{floorRating(film?.vote_average)}</div>
          </div>
        </div>
        <Poster path={film.poster_path} />
        <p className="plot">{film?.overview}</p>
        <CastAndCrew id={film?.id} type="tv" />
      </div>
    </main>
  );
}
