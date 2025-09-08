import { fetch_options, tmdb_base } from '@/app/api';
import Films from './Films';

export default async function ComingSoon() {
  const data = await fetch(tmdb_base + '/movie/upcoming?region=GB', fetch_options);
  const films = await data.json();
  console.log(films);
  return (
    <Films films={films.results} name="Coming Soon" mediaType="movie" />
  );
}
