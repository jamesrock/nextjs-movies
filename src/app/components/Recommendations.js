import { fetch_options, tmdb_base } from '@/app/api';
import Films from './Films';

export default async function Recommendations({
  id
}) {
  const data = await fetch(tmdb_base + `/movie/${id}/recommendations?region=GB`, fetch_options);
  const films = await data.json();
  return (
    <Films films={films.results} name="Recommendations" />
  );
}
