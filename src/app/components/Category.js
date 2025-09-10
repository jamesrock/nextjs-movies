import { fetch_options, tmdb_base, genres } from '@/app/api';
import Films from './Films';

export default async function Category({
  id
}) {
  const data = await fetch(tmdb_base + '/discover/movie?region=GB&sort_by=popularity.desc&with_release_type=2%7C3' + (id ? `&with_genres=${id}` : ''), fetch_options);
  const films = await data.json();
  console.log(films);
  return (
    <Films films={films.results} name={genres[id]} genre={id} />
  );
}
