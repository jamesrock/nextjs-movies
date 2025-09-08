import { fetch_options, tmdb_base, media_type_credits_path, dedupe, sortByPriority, job_priority } from '@/app/api';
import People from './People';

export default async function CastAndCrew({
  id,
  type
}) {
  const data = await fetch(tmdb_base + `/${type}/${id}/${media_type_credits_path[type]}?language=en-US`, fetch_options);
  const people = await data.json();
  console.log(people);
  return (
    <div className="cast-and-crew">
      {!!people.cast.length && <People people={type==='movie' ? dedupe(people.cast, 'cast') : people.cast} name="Cast" type="cast" mediaType={type} />}
      {!!people.crew.length && <People people={type==='movie' ? dedupe(sortByPriority(people.crew, job_priority), 'crew') : people.crew} name="Crew" type="crew" mediaType={type} />}
    </div>
  );
}
