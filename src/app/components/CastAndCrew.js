import { fetch_options, tmdb_base, dedupe, sortByPriority } from '@/app/api';
import People from './People';

export default async function CastAndCrew({
  id
}) {
  const data = await fetch(tmdb_base + `/movie/${id}/credits`, fetch_options);
  const people = await data.json();
  return (
    <div className="cast-and-crew">
      <People people={dedupe(people.cast, 'cast')} name="Cast" type="cast" />
      <People people={dedupe(sortByPriority(people.crew, 'job'), 'crew')} name="Crew" type="crew" />
    </div>
  );
}
