import { dedupe, api } from '@/app/api';
import Films from './Films';

export default async function Filmography({
  id
}) {
  const films = await api.getFilmography(id);
  return (
    <div className="cast-and-crew">
      <Films films={dedupe(films.cast, 'cast')} name="Cast" credits="cast" />
      <Films films={dedupe(films.crew, 'crew')} name="Crew" credits="crew" />
    </div>
  );
}
