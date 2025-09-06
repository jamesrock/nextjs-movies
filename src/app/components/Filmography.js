import Link from 'next/link'
import { fetch_options, tmdb_base, tmdb_media_base } from '@/app/api';
import Films from './Films';

export default async function Filmography({
  id
}) {
  const data = await fetch(tmdb_base + `/person/${id}/combined_credits?language=en-US`, fetch_options);
  const films = await data.json();
  console.log(films);
  return (
    <div className="cast-and-crew">
      {!!films.cast.length && <Films films={films.cast} name="Cast" type="cast" />}
      {!!films.crew.length && <Films films={films.crew} name="Crew" type="crew" />}
    </div>
  );
}
