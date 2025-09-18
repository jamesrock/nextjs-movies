import Link from 'next/link';
import { api } from '@/app/api';

export default async function Genres() {
  const genres = await api.getGenres();
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
