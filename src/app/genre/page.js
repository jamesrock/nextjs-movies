import Link from 'next/link';
import { fetch_options, tmdb_base } from '@/app/api';

export default async function Genres() {
  const data = await fetch(tmdb_base + '/genre/movie/list?language=en', fetch_options);
  const genres = await data.json();
  console.log(genres);
  return (
    <main>
      <div className="all-genres">
      {genres?.genres?.map((genre) => (
        <div key={genre.id}><Link href={`/genre/${genre.id}`}>{genre.name}</Link></div>
      ))}
      </div>
    </main>
  );
}
