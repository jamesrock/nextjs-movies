import { fetch_options, tmdb_base, dedupe, filterFilms } from '@/app/api';
import Films from './Films';

export default async function Filmography({
  id
}) {
  const data = await fetch(tmdb_base + `/person/${id}/combined_credits`, fetch_options);
  const films = await data.json();
  console.log(films);
  return (
    <div className="cast-and-crew">
      <Films films={dedupe(filterFilms(films.cast), 'cast')} name="Cast" type="cast" credits="filmography/cast" />
      <Films films={dedupe(filterFilms(films.crew), 'crew')} name="Crew" type="crew" credits="filmography/crew" />
    </div>
  );
}
