import Link from 'next/link'
import { fetch_options, tmdb_base, tmdb_media_base } from '@/app/api';

export default async function Category({
  id,
  name
}) {
  const data = await fetch(tmdb_base + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=GB&sort_by=popularity.desc&with_release_type=2%7C3' + (id ? `&with_genres=${id}` : ''), fetch_options);
  const films = await data.json();
  console.log(films);
  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="category-items">
      {films?.results?.length && films?.results?.map((film) => (
        <Link href={`/movie/${film.id}`} className="category-item" key={film.id}>
          <div className="poster-crop">
            <img className="poster" src={tmdb_media_base + film.poster_path} />
          </div>
          <div className="desc">
            <div className="desc-name">{film.title}</div>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
