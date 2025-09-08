import Link from 'next/link';
import Poster from '@/app/components/Poster';
import { fetch_options, tmdb_base, genres } from '@/app/api';

export default async function Genre({
  params
}) {
  const { id } = await params;
  const data = await fetch(tmdb_base + `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=GB&sort_by=popularity.desc&with_release_type=2%7C3&with_genres=${id}`, fetch_options);
  const films = await data.json();
  console.log(films);
  return (
    <main>
      <div className="films-head">
        <h1>{genres[id]}</h1>
      </div>
      <div className="films">
      {films?.results?.map((film) => (
        <Link href={`/movie/${film.id}`} className="category-item" key={film.id}>
          <Poster path={film.poster_path} />
          <div className="desc">
            <div className="desc-name">{film.title}</div>
          </div>
        </Link>
      ))}
      </div>
    </main>
  );
}
