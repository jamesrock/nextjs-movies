import Link from 'next/link'
import { fetch_options, tmdb_base } from '@/app/api';
import People from './People';

export default async function CastAndCrew({
  id
}) {
  const data = await fetch(tmdb_base + `/movie/${id}/credits?language=en-US`, fetch_options);
  const people = await data.json();
  console.log(people);
  return (
    <div className="cast-and-crew">
      <People people={people.cast} name="Cast" type="cast" />
      <People people={people.crew} name="Crew" type="crew" />
    </div>
  );
}
